import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AssignmentIcon from '@material-ui/icons/Assignment'

import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { tokenState } from '../../reducers/tokenReducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const [menu, setMenu] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })
    const token = useSelector<tokenState, tokenState['token']>(
        (state) => state.token
    )

    const tokenLocalStorage = localStorage.getItem('token')
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }

            setMenu({ ...menu, [anchor]: open })
        }

    const dispatch = useDispatch()
    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}>
            <List>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Acasă'} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <React.Fragment>
                {tokenLocalStorage == null ? (
                    <React.Fragment>
                        <List>
                            <Link to="/login">
                                <ListItem button>
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Conectare'} />
                                </ListItem>
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Link to="/register">
                                <ListItem button>
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Register'} />
                                </ListItem>
                            </Link>
                        </List>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <List>
                            <Link to="/profile">
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Contul meu'} />
                                </ListItem>
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Link to="/adaugacod">
                                <ListItem button>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Adauga Cod'} />
                                </ListItem>
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <ListItem
                                button
                                onClick={() => {
                                    dispatch({
                                        type: 'DELETE_TOKEN',
                                    })
                                    localStorage.removeItem('token')
                                }}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary={'LogOut'} />
                            </ListItem>
                        </List>
                    </React.Fragment>
                )}
            </React.Fragment>
            <Divider />
        </div>
    )

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer('left', true)}
                        edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Citizen 2 Day
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor={'left'}
                open={menu['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}>
                {list()}
            </SwipeableDrawer>
        </div>
    )
}
