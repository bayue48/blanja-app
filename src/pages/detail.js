import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Product from '../components/product'
import ProductFooter from '../components/productFooter'
import axios from 'axios';

// const getUrl = 'http://localhost:8000/api/v2/products/'

export default class detail extends Component {
    state = {
        product: []
    }

    getProduct = () => {
        const { match } = this.props
        axios
            .get(`${process.env.REACT_APP_API}/api/v2/products/` + match.params.id)
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
        console.log(this.props.location)
        console.log(this.state.product)
        return (
            <>
                <Navbar />
                {product.data && product.data.map(({ id, product_name, product_brand, product_img, product_rating, product_desc, product_condition, product_price }) => {
                    return <Product
                        id={id}
                        name={product_name}
                        brand={product_brand}
                        rating={product_rating}
                        desc={product_desc}
                        price={product_price}
                        condition={product_condition}
                        image={product_img}
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
