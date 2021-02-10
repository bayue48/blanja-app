import React from "react";
import Slider from "react-slick";
import { card1, card2, card3, card4, next, prev } from "../../../src/assets";
import "./carousel.css";

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
        marginRight: "4vw",
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

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "white",
        marginLeft: "4vw",
        zIndex: 1,
        padding: "1.5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1px solid grey"
      }}
      onClick={onClick}
    >
      <img src={prev} alt="" className="topslider-arrow" />
    </div>
  );
};

const carousell = () => {
  const data = [
    {
      id: card1,
      name: "Special Edition",
    },
    {
      id: card2,
      name: "Trends In 2021",
    },
    {
      id: card3,
      name: "Black Edition",
    },
    {
      id: card4,
      name: "Winter Sale",
    },
  ];

  const settings = {
    dots: true,
    className: "top-slider",
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // centerPadding: '160px',
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "25px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container">
        <div>
          <Slider {...settings}>
            {data.map((item, index) => {
              return (
                <div className="topslider-items" key={index}>
                  <div className="topslider-item">
                    <img
                      src={item.id}
                      alt=""
                      className="slider-top-img img-fluid"
                    />
                    <p className="promo-name">{item.name}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default carousell;
