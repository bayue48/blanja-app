import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Product from '../components/product'
import ProductFooter from '../components/productFooter'
import axios from 'axios';

const getUrl = 'http://localhost:8000/api/v2/products/'

export default class detail extends Component {
    state = {
        product : []
    }

    getProduct = () => {
        const {match} = this.props
        axios
        .get( getUrl + match.params.id )
        .then(({data}) => {
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
    
    render() {
        const {product} = this.state
        console.log(product)

        return (
            <>
            <Navbar />
            <br></br>
            {product.data && product.data.map(
                ({id, product_name, product_brand, product_rating, product_desc, product_price, product_condition}) => {
                    return <Product
                    key={id}
                    name={product_name}
                    brand={product_brand}
                    rating={product_rating}
                    desc={product_desc}
                    price={product_price}
                    condition={product_condition}
                    />
                })}
            <ProductFooter />
            </>
        )
    }
}
