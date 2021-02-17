import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  accs,
  bagpack,
  cap,
  dress,
  glass,
  handbag,
  heels,
  jacket,
  pants,
  shirt,
  shoes,
  shorts,
  socks,
  tie,
  watchs,
  next,
} from "../../assets";
import "./carousel.css";

export default class category extends Component {
  render() {
    const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{
            ...style,
            display: "block",
            background: "white",
            padding: "1.5vw",
            borderRadius: "50%",
            marginRight: "0.5vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid grey"
          }}
          onClick={onClick}
        >
          <img src={next} alt="" className="topslider-arrow" />
        </div>
      );
    };

    const settings = {
      // centerMode: true,
      infinite: true,
      draggable: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      // centerPadding: '1px',
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1126,
          settings: {
            arrows: true,
            //   centerMode: true,
            slidesToShow: 4,
            //   centerPadding: '1px',
          },
        },
        {
          breakpoint: 990,
          settings: {
            arrows: true,
            //   centerMode: true,
            slidesToShow: 3,
            //   centerPadding: '1px',
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            //   centerMode: true,
            slidesToShow: 2,
            //   centerPadding: '40px',
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            //   centerMode: true,
            slidesToShow: 1,
            //   centerPadding: '100px',
          },
        },
      ],
    };

    return (
      <>
        <Container style={{ marginTop: "50px" }}>
          <h2 className="text">Category</h2>
          <p className="text-muted">What are you currently looking for</p>
        </Container>
        <Container>
          <Slider {...settings}>
            <div>
              <Link
                to={{
                  pathname: `/category/1`,
                  state: this.state,
                }}
              >
                <Image src={shirt} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/2`,
                  state: this.state,
                }}
              >
                <Image src={shorts} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/3`,
                  state: this.state,
                }}
              >
                <Image src={jacket} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/4`,
                  state: this.state,
                }}
              >
                <Image src={pants} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/5`,
                  state: this.state,
                }}
              >
                <Image src={shoes} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/6`,
                  state: this.state,
                }}
              >
                <Image src={heels} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/7`,
                  state: this.state,
                }}
              >
                <Image src={watchs} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/8`,
                  state: this.state,
                }}
              >
                <Image src={handbag} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/9`,
                  state: this.state,
                }}
              >
                <Image src={bagpack} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/10`,
                  state: this.state,
                }}
              >
                <Image src={socks} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/11`,
                  state: this.state,
                }}
              >
                <Image src={glass} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/12`,
                  state: this.state,
                }}
              >
                <Image src={cap} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/13`,
                  state: this.state,
                }}
              >
                <Image src={tie} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/14`,
                  state: this.state,
                }}
              >
                <Image src={dress} className="category" />
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: `/category/15`,
                  state: this.state,
                }}
              >
                <Image src={accs} className="category" />
              </Link>
            </div>
          </Slider>
        </Container>
      </>
    );
  }
}
