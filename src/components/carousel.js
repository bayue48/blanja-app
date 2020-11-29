import React, { Component } from 'react'
import { Container, Image } from 'react-bootstrap'
import Slider from 'react-slick';
import { card1, card2, card3, card4 } from '../../src/assets'

export default class carousel extends Component {
    render() {
        const settings = {
            dots: true,
            centerMode: true,
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: '60px',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 1,
                      centerPadding: '25px',
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      arrows: false,
                      centerMode: false,
                      slidesToShow: 1
                    }
                  }
                ]
          };

        return (
            <Container>
                <Slider { ...settings }>
                <div className='carousel'>
                    <Image src={ card2 } />
                </div>
                <div className='carousel'>
                    <Image src={ card3 } />
                </div>
                <div className='carousel'>
                    <Image src={ card2 } />
                </div>
                <div className='carousel'>
                    <Image src={ card3 } />
                </div>
                </Slider>
            </Container>
        )
    }
}
