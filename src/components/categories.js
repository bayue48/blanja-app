import React, { Component } from 'react'
import { Container, Image } from 'react-bootstrap'
import Slider from 'react-slick';
import { Link } from 'react-router-dom'
import { accs, bagpack, cap, dress, glass, handbag, heels, jacket, pants, 
    shirt, shoes, shorts, socks, tie, watchs } from '../../src/assets'

export default class category extends Component {
    render() {
        const settings = {
            centerMode: true,
            infinite: true,
            draggable: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerPadding: '1px',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 3,
                      centerPadding: '1px',
                    }
                  },
                {
                    breakpoint: 768,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 2,
                      centerPadding: '40px',
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 1,
                      centerPadding: '100px',
                    }
                  }
                ]
          };

        return (
            <>
                <Container style={{ marginTop: '50px' }}>
                    <h2 className='text'>Category</h2>
                    <p className='text-muted'>What are you currently looking for</p>
                </Container>
                <Container>
                    <Slider { ...settings } >
                    <div>
                    <Link to={{
                        pathname: `/search?category=1`,
						state: this.state
                    }}>
                        <Image src={ shirt } />
                    </Link>
                    </div>
                    <div>
                        <Image src={ shorts } />
                    </div>
                    <div>
                        <Image src={ jacket } />
                    </div>
                    <div>
                        <Image src={ pants } />
                    </div>
                    <div>
                        <Image src={ shoes } />
                    </div>
                    <div>
                        <Image src={ heels } />
                    </div>
                    <div>
                        <Image src={ watchs } />
                    </div>
                    <div>
                        <Image src={ handbag } />
                    </div>
                    <div>
                        <Image src={ bagpack } />
                    </div>
                    <div>
                        <Image src={ socks } />
                    </div>
                    <div>
                        <Image src={ glass } />
                    </div>
                    <div>
                        <Image src={ cap } />
                    </div>
                    <div>
                        <Image src={ tie } />
                    </div>
                    <div>
                        <Image src={ dress } />
                    </div>
                    <div>
                        <Image src={ accs } />
                    </div>
                    </Slider>
                </Container>
            </>
        )
    }
}
