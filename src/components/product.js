import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";
import { blank } from "../assets";

export default class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: 0,
      quantity: 0,
    };
  }

  handleClickQty = () => {
    this.setState((prevState) => ({ size: prevState.size + 1 }));
  };

  handleClickPlus = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  handleClickQtyMin = () => {
    this.setState((prevState) => ({
      size: Math.max(prevState.size - 1, 0),
    }));
  };

  handleClickMin = () => {
    this.setState((prevState) => ({
      quantity: Math.max(prevState.quantity - 1, 0),
    }));
  };

  render() {
    const {
      name,
      brand,
      rating,
      desc,
      price,
      condition,
      image,
      id,
      category,
      size,
      color,
      addToCart,
    } = this.props;
    return (
      <Container>
        <p
          style={{
            fontSize: "12px",
            color: "#9b9b9b",
          }}
        >
          Home {">"} category {">"} <b>{category}</b>
        </p>
        <Row className="d-flex" id={id}>
          <div className="col-4">
            <img
              className="img-fluid rounded"
              src={
                image.split(",")[0] !== undefined
                  ? `${process.env.REACT_APP_API}` + image.split(",")[0]
                  : blank
              }
              style={{ width: "500px" }}
              alt="gambar"
            />
            <div className="d-flex">
              <img
                className="img-fluid rounded mt-2"
                src={
                  image.split(",")[1] !== undefined
                    ? `${process.env.REACT_APP_API}` + image.split(",")[1]
                    : blank
                }
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={
                  image.split(",")[2] !== undefined
                    ? `${process.env.REACT_APP_API}` + image.split(",")[2]
                    : blank
                }
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={
                  image.split(",")[3] !== undefined
                    ? `${process.env.REACT_APP_API}` + image.split(",")[3]
                    : blank
                }
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={
                  image.split(",")[4] !== undefined
                    ? `${process.env.REACT_APP_API}` + image.split(",")[4]
                    : blank
                }
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={
                  image.split(",")[5] !== undefined
                    ? `${process.env.REACT_APP_API}` + image.split(",")[5]
                    : blank
                }
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
            </div>
          </div>
          <div className="col-7 dtl-prdct">
            <p className="txt-name">{name}</p>
            <p className="txt-brand text-muted">{brand}</p>
            <Rating product_rating={rating} />
            <p className="txt-brand text-muted mt-2">Price</p>
            <h2>Rp. {price}</h2>
            <p
              className="mt-4"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Color
            </p>
            <div className="dropdown-divider"></div>
            <select
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
              }}
            >
              {color &&
                color.split(",").map(() => {
                  return (
                    <>
                      <option>{color}</option>
                    </>
                  );
                })}
            </select>
            {/* <div
                className="clr-dtl"
                style={{ backgroundColor: "#1A1A1A" }}
              ></div>
              <div
                className="clr-dtl"
                style={{ backgroundColor: "#D84242" }}
              ></div>
              <div
                className="clr-dtl"
                style={{ backgroundColor: "#4290D8" }}
              ></div>
              <div
                className="clr-dtl"
                style={{ backgroundColor: "#42D86C" }}
              ></div> */}
            <div
              className="d-flex mt-4 justify-content-around"
              style={{ height: "80px", width: "380px" }}
            >
              <div style={{ width: "150px" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Size</p>
                <div className="dropdown-divider"></div>
                <select
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  {size &&
                    size.split(",").map(() => {
                      return (
                        <>
                          <option>{size}</option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div style={{ width: "150px", marginLeft: "80px" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Jumlah</p>
                <div
                  className="d-flex justify-content-between"
                  style={{ height: "36px", width: "150px" }}
                >
                  <Link
                    className="text-decoration-none"
                    onClick={() => this.setState({ quantity: this.state.quantity - 1 })}
                  >
                    <div
                      className="btn-c"
                      style={{ backgroundColor: "#D4D4D4" }}
                    >
                      -
                    </div>
                  </Link>
                  <p>{this.state.quantity}</p>
                  <Link
                    className="text-decoration-none"
                    onClick={() => this.setState({ quantity: this.state.quantity + 1 })}
                  >
                    <div
                      className="btn-c"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "solid 1px",
                      }}
                    >
                      +
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Row className="mt-3">
              <Link to="/chat" className="chat text-decoration-none d-flex">Chat</Link>
              <Link
                className="add-bag text-decoration-none d-flex"
                onClick={addToCart}
              >
                Add bag
              </Link>
              <Link
                to={{ pathname: "/checkout" }}
                className="buy-now text-decoration-none d-flex"
                onClick={addToCart}
              >
                Buy Now
              </Link>
            </Row>
          </div>
        </Row>
        <div>
          <h2 className="information">Informasi Product</h2>
          <p className="condition">Condition</p>
          <p className="v-condition">{condition}</p>
          <p className="condition">Description</p>
          <p className="v-description">{desc}</p>
        </div>
        <div>
          <p className="prdct-revw">Product review</p>
          <div className="ratee">
            <div className="ratee-number">
              <p className="txt-rating">
                {rating}
                <p className="per text-muted">/5</p>{" "}
              </p>
              <div className="d-flex d-flex justify-content-center">
                <Rating product_rating={rating} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
