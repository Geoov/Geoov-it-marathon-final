import React from 'react'
import { Card, Typography } from '@material-ui/core'
import './Home.scss'

function Categories() {
    return (
        <div className="categories-wrapper">
            <div className="container">
                <Card>
                    <Typography variant="h6">Forrestation</Typography>
                </Card>
                <Card>
                    <Typography variant="h6">Blood Donating</Typography>
                </Card>
                <Card>
                    <Typography variant="h6">Charity</Typography>
                </Card>
            </div>
        </div>
    )
}

export default Categories
