import React, { Component } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../rating";
import axios from "axios";
import { blank } from "../../assets";

// const getUrl = 'http://localhost:8000/api/v2/products?sortBy=updated_at&orderBy=desc';

export default class New extends Component {
  state = {
    products: {},
  };

  getAllProducts = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/products/sort?sortBy=updated_at&orderBy=desc`
      )
      .then(({ data }) => {
        this.setState({
          products: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getAllProducts();
  };

  render() {
    const { products } = this.state;
    console.log(this.state);
    return (
      <>
        <Container style={{ marginTop: "50px" }}>
          <h2 className="text">New</h2>
          <p className="text-muted">You’ve never seen it before!</p>
        </Container>
        <Container>
          <div className="row d-flex justify-content-start">
            {products.products &&
              products.products.map(
                ({
                  product_name,
                  product_price,
                  product_brand,
                  product_img,
                  product_rating,
                  id,
                }) => {
                  return (
                    <Card
                      className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded"
                      id="cards"
                      key={id}
                    >
                      <img
                        src={
                          product_img.split(",")[0] !== undefined
                            ? `${process.env.REACT_APP_API}` +
                              product_img.split(",")[0]
                            : blank
                        }
                        className="card-img-top"
                        style={{ maxHeight: "50%" }}
                        alt="..."
                      />

                      <div className="card-body">
                        <Link
                          to={{
                            pathname: `/detail/${id}`,
                            state: this.state,
                          }}
                        >
                          <h5 className="card-title">{product_name}</h5>
                        </Link>
                        <p className="price">Rp. {product_price}</p>
                        <p className="text-muted">{product_brand}</p>
                        <Rating product_rating={product_rating} />
                      </div>
                    </Card>
                  );
                }
              )}
          </div>
        </Container>
      </>
    );
  }
}
