import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@material-ui/core'
import Citizen from '../../assets/images/citizen.svg'
import Forestation from '../../assets/images/forrestation.png'
import Charity from '../../assets/images/charity.png'
import BloodDonating from '../../assets/images/blood.svg'
import './Home.scss'

function EducationCarousel() {
    var items = [
        {
            name: 'BE A BETTER CITIZEN',
            description: 'Get actively involved in creating a better society!',
            backgroundImage: `url(${Citizen})`,
            backgroundSlider: '#eeeeee',
        },
        {
            name: 'Get involved in FORESTATION',
            description: 'Help by planting trees with more people!',
            backgroundImage: `url(${Forestation})`,
            backgroundSlider: '#ffffff',
        },
        {
            name: 'Get involved in CHARITY',
            description: 'Help by volunteer in charity!',
            backgroundImage: `url(${Charity})`,
            backgroundSlider: '#edfcff',
        },
        {
            name: 'Get involved in DONATING BLOOD',
            description: 'Help by donating blood!',
            backgroundImage: `url(${BloodDonating})`,
            backgroundSlider: '#7293E8',
        },
    ]

    return (
        <Carousel autoPlay={true}>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    )
}

function Item(props: any) {
    return (
        <div className="slider-container">
            <div className="slider-image">
                <div
                    className="image-wrapper"
                    style={{
                        backgroundImage: `${props.item.backgroundImage}`,
                    }}></div>
            </div>
            <div className="slider-text">
                <div className="text-wrapper">
                    <Typography variant="h2">{props.item.name}</Typography>
                    <Typography variant="h6">
                        {props.item.description}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default EducationCarousel
