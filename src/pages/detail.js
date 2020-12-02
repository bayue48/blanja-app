import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Product from '../components/product'
import ProductFooter from '../components/productFooter'
import axios from 'axios';

const getUrl = 'http://localhost:8000/api/v2/products/'

export default class detail extends Component {
    state = {
        product: []
    }

    getProduct = () => {
        const { match } = this.props
        axios
            .get(getUrl + match.params.id)
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

        return (
            <>
                { product?(
                            <div>
                                <Navbar />
                                <Product
                                    key={product.id}
                                    name={product.product_name}
                                    brand={product.product_brand}
                                    rating={product.product_rating}
                                    desc={product.product_desc}
                                    price={product.product_price}
                                    condition={product.product_condition}
                                />
                                <ProductFooter />
                            </div>
                        
                    ) : console.log('data kosong', product.id)}
            </>
        )
    }
}
