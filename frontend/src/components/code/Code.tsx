import React, { useEffect, useState } from 'react'
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

import './Code.scss'
import { useHistory } from 'react-router-dom'

function App() {
    const [code, setCode] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const loadState = () => {
        try {
            const token = localStorage.getItem('token')
            if (token == null) {
                return null
            }
            return token
        } catch (err) {
            return null
        }
    }

    function sendLogin() {
        let token = null
        token = loadState()
        var url = 'http://localhost:3030' + '/codes/add'
        var bearer = 'Bearer ' + token
        axios({
            method: 'post',
            url: url,
            data: {
                code: code,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                console.log(response)
            })

            .catch(() => {
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
                <Typography variant="h4">Adauga Cod</Typography>
                <br />
                <TextField
                    id="outlined-basic"
                    label="Cod"
                    variant="outlined"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value)
                    }}
                />
                <br />
                <Button variant="contained" color="primary" onClick={sendLogin}>
                    Adauga codul
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Cod incorect!"></Snackbar>
            </Card>
        </div>
    )
}

export default App
