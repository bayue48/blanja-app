import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Product from '../components/product'
import ProductFooter from '../components/productFooter'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { addToCart } from "../redux/actions/cart";

const IMG = process.env.REACT_APP_API
toast.configure();

class detail extends Component {
    state = {
        product: {},
        image: {},
    }

    getProduct = () => {
        const { match } = this.props
        axios
            .get(`${process.env.REACT_APP_API}/products/` + match.params.id)
            .then(({ data }) => {
                this.setState({
                    product: data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount = () => {
        this.getProduct();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.match !== prevProps.match) {
            this.getProduct(this.props.match);
        }
    }

    render() {
        const { product } = this.state
        const { addToCart } = this.props;
        console.log(this.props.location)
        console.log(this.state.product)
        return (
            <>
                <Navbar />
                {product.data && product.data.map(({ id, user_id, product_name, product_brand, product_img, product_rating, product_desc, product_condition, product_price, category_name, sizes_name, product_qty, color_name }) => {
                    return <Product
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
                        addToCart={() => {
                            addToCart(
                              id,
                              IMG + product_img.split(",")[0],
                              product_price,
                              product_name,
                              product_brand,
                            );
                            console.log("brand", product_brand, IMG + product_img.split(",")[0])
                            toast.success('Product Added to Bag', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                });
                          }}
                    />
                })}
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
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (id, image, price, name, brand) =>
        dispatch(addToCart(id, image, price, name, brand)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(detail);