import React, { useEffect } from 'react'
import './App.scss'

import Header from './shared/header/Header'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Profile from './components/citizen/Profile'
import Code from './components/code/Code'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
)
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}
function App() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const loadState = () => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            if (token == null) {
                return null
            }
            return token
        } catch (err) {
            return null
        }
    }
    useEffect(() => {
        let token = loadState()
        if (token != null) {
            dispatch({ type: 'SET_TOKEN', payload: token })

            // fetch(url, {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         Authorization: bearer,
            //         'Content-Type': 'application/json',
            //     },
            // })
            //     .then((responseJson) => {
            //         console.log(responseJson)
            //     })
            //     .catch((error) => console.log(error))
        }
    }, [])
    return (
        <BrowserRouter>
            <div className="main">
                <Header />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/adaugacod" component={Code} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
