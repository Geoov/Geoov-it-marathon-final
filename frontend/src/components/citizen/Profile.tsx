import React, { useEffect, useState } from 'react'
import './Profile.scss'
import UserImg from '../../assets/images/user.png'
import { Typography } from '@material-ui/core'
import axios from 'axios'

function Profile() {
    const [page, setPage] = useState(0)

    const [loaded, isLoaded] = useState(false)

    const [datePersonale, setDatePersonale] = useState({
        id: 0,
        nume: 0,
        prenume: 0,
        telefon: 0,
        puncte: 0,
    })

    let x = {}

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
    useEffect(() => {
        let token = loadState()
        var url = 'http://localhost:3030' + '/citizen'
        var bearer = 'Bearer ' + token
        isLoaded(false)

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((res: any) => {
                setDatePersonale(res.data)
                isLoaded(true)
                // setDatePersonale(...datePersonale, [res.data])
                console.log(datePersonale)
                console.log(res.data)
            })
    }, [])

    return (
        <div id="boxed-container-profile">
            <div className="left-section">
                <div className="user-wrapper">
                    <div className="image-wrapper">
                        <img src={UserImg} className="avatar-image"></img>
                    </div>

                    <div className="profile-pages-wrapper">
                        <ul>
                            <li>
                                <Typography
                                    variant="h6"
                                    onClick={() => setPage(0)}>
                                    PROFILE
                                </Typography>
                            </li>
                            <li>
                                <Typography
                                    variant="h6"
                                    onClick={() => setPage(1)}>
                                    EVENTS LIST
                                </Typography>
                            </li>
                            <li>
                                <Typography
                                    variant="h6"
                                    onClick={() => setPage(2)}>
                                    REWARDS LIST
                                </Typography>
                            </li>
                            <li>
                                <Typography
                                    variant="h6"
                                    onClick={() => setPage(3)}>
                                    ACHIEVEMENTS LIST
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="right-section">
                {page === 0 && (
                    <div className="user-wrapper">
                        <h2>PROFILE</h2>
                        <div className="data-wrapper">
                            <div className="row">
                                Nume: {datePersonale.nume}
                            </div>
                            <div className="row">
                                Prenume: {datePersonale.prenume}
                            </div>
                            <div className="row">
                                Telefon: {datePersonale.telefon}
                            </div>
                            <div className="row">
                                Puncte: {datePersonale.puncte}
                            </div>
                        </div>
                    </div>
                )}
                {page === 1 && (
                    <div className="user-wrapper">
                        <h2>EVENTS</h2>
                    </div>
                )}

                {page === 2 && (
                    <div className="user-wrapper">
                        <h2>REWARDS</h2>
                    </div>
                )}

                {page === 3 && (
                    <div className="user-wrapper">
                        <h2>ACHIEVEMENTS</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
