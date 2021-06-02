import React, { useState } from 'react'
import {
    Button,
    Card,
    Snackbar,
    TextField,
    Typography,
} from '@material-ui/core'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { Store } from '../Store'
import { tokenState } from '../../reducers/tokenReducer'

import './Register.scss'
import { useHistory } from 'react-router-dom'

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const token = useSelector<tokenState, tokenState['token']>(
        (state) => state.token
    )

    const dispatch = useDispatch()
    const history = useHistory()

    function sendRegister() {
        if (username == null || password == null) return showError()
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/register',
            data: {
                username: username,
                password: password,
            },
        })
            .then((res) => res.data)
            .then((data) => {
                history.push(`/login`)
            })
            .catch((e) => {
                showError()
            })
    }

    const [open, setOpen] = React.useState(false)

    const showError = () => {
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }
    return (
        <div className="form-wrapper">
            <Card>
                <Typography variant="h4">Register new Account</Typography>
                <br />
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <br />
                <TextField
                    id="outlined-basic"
                    label="Parolă"
                    variant="outlined"
                    value={password}
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendRegister}>
                    Înregistrare
                </Button>

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Date invalide!"></Snackbar>
            </Card>
        </div>
    )
}

export default App
