import React, { Component } from 'react';
import { gez, star } from '../../src/assets'
import Navbar from '../components/navbar'
import axios from 'axios'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const getUrl = 'http://localhost:8000/api/v2/search?'
const urlParams = new URLSearchParams(window.location.search)

export default class search extends Component {
    state = {
        products: [],
    }

    searchProduct = () => {
        axios.get(getUrl + urlParams)
            .then(({ data }) => {
                this.setState({
                    products: data.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    componentDidMount = () => {
        this.searchProduct()
    }

    render() {
        console.log(this.state.items)
        const { products } = this.state
        return (
            <>
                <Navbar />
                <Container>
                    <br />
                    <h2>What you're looking for</h2>
                    <br />
                    <div className="row ml-2">
                        {
                             products && products.map(({ id, product_name, product_brand, product_price }) => {
                                return (
                                    <Card className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded" id="cards" key={id}>
                                        <img src={gez} className="card-img-top" alt="..." />

                                        <div className="card-body">
                                            <Link to={{
                                                pathname: `/detail/${id}`,
                                                state: this.state
                                            }}>
                                                <h5 className="card-title">{product_name}</h5>
                                            </Link>
                                            <p className="price">Rp. {product_price}</p>
                                            <p className="text-muted">{product_brand}</p>
                                            <img src={star} className="img-fluid" alt="b5" />
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </Container>
            </>
        )
    }
}
