import React, { useState, useEffect } from "react";
import Rating from "../components/rating";
import Navbar from "../components/navbar";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const base_url = process.env.REACT_APP_API;

const SearchPage = ({ history }) => {
  const [product, setProduct] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  console.log(history.location.search);

  const getAllProducts = () => {
    axios
      .get(base_url + "/search" + history.location.search)
      .then(({ data }) => {
        console.log(data.data);
        setProduct(data.data.products);
        setPageInfo(data.data.pageInfo);
      })
      .catch((error) => {
        setProduct([]);
        setPageInfo([]);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts(history.location.search);
  }, [history.location.search]);

  const { category } = history.location.search

  return (
    <>
      <Navbar />
      <Container>
        {product.length > 0 ? (
          <>
            <p
              style={{
                fontSize: "12px",
                color: "#9b9b9b",
              }}
            >
              Home {">"} search {">"} <b>{category}</b>
            </p>
            <br />
            <h2>What's you're looking for</h2>
            <br />
            <div className="row ml-2">
              {product.map(
                ({
                  product_name,
                  product_img,
                  product_price,
                  product_brand,
                  product_rating,
                  category_name,
                  color_name,
                  size_name,
                  rating,
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
                        className="card-img-top"
                        style={{ maxHeight: "50%" }}
                        alt="..."
                      />

                      <div className="card-body">
                        <Link
                          to={{
                            pathname: `/detail/${id}`,
                            // state: this.state,
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
          </>
        ) : (
          <>
            <h2>No Product</h2>
          </>
        )}
      </Container>
    </>
  );
};

export default SearchPage;
