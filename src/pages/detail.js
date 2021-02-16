import React, { Component } from "react";
import Navbar from "../components/navbar";
import Product from "../components/product";
import ProductFooter from "../components/productFooter";
import axios from "axios";

class detail extends Component {
  state = {
    product: {},
    image: {},
  };

  getProduct = () => {
    const { match } = this.props;
    axios
      .get(`${process.env.REACT_APP_API}/products/` + match.params.id)
      .then(({ data }) => {
        this.setState({
          product: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getProduct();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.match !== prevProps.match) {
      this.getProduct(this.props.match);
    }
  };

  render() {
    const { product } = this.state;
    console.log(this.props.location);
    console.log(this.state.product);
    return (
      <>
        <Navbar />
        {product.data &&
          product.data.map(
            ({
              id,
              user_id,
              product_name,
              product_brand,
              product_img,
              product_rating,
              product_desc,
              product_condition,
              product_price,
              category_name,
              sizes_name,
              product_qty,
              color_name,
            }) => {
              return (
                <Product
                  key={id}
                  id={id}
                  uid={user_id}
                  name={product_name}
                  brand={product_brand}
                  rating={product_rating}
                  desc={product_desc}
                  price={product_price}
                  condition={product_condition}
                  image={product_img}
                  category={category_name}
                  size={sizes_name}
                  color={color_name}
                  qtys={product_qty}
                />
              );
            }
          )}
        {/* <Product 
                    id={product.id}
                    name={product.product_name}
                    brand={product.product_brand}
                    rating={product.product_rating}
                    desc={product.product_desc}
                    price={product.product_price}
                    condition={product.product_condition}
                    image={product.product_img}
                /> */}
        <ProductFooter />
      </>
    );
  }
}

export default detail;