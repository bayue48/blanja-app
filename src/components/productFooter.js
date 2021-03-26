import React, { Component } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";
import axios from "axios";

export default class productFooter extends Component {
  state = {
    products: {},
  };

  getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/products/sort/`)
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

    return (
      <>
        <Container>
          <h2 className="text">You can also like this</h2>
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
                          `${process.env.REACT_APP_API}` +
                          product_img.split(",")[0]
                        }
                        className="img-fluid img-thumbnail"
                        style={{ objectFit: "cover", maxHeight: "50%" }}
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
