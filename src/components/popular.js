import React, { Component } from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { gez, star } from '../../src/assets'
import axios from 'axios'

const getUrl = 'http://localhost:8000/api/v2/products?sortBy=product_rating&orderBy=desc';

export default class Popular extends Component {
    state = {
        products: {},
    };

    getAllProducts = () => {
        axios
        .get(getUrl)
        .then(({data}) => {
            this.setState({
                products: data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAllProducts();
    }

    render() {
        const { products } = this.state;

        return (
            <>
                <Container style={{ marginTop: '50px' }}>
                    <h2 className="text">Popular</h2>
			        <p className="text-muted">You’ve never seen it before!</p>
                </Container>
                <Container>
                    <div className="row d-flex justify-content-start">
                        {products.data && products.data.map(
                            ({product_name, product_price, product_brand, id} ) => {
                                return(
                                    <Card className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded" id="cards" key={id}>
                                        <img src={ gez } className="card-img-top" alt="..."/>
                                    
                                        <div className="card-body">
                                            <Link to={{
                                                        pathname:`/products/${id}`,
                                                        state: this.state
                                                    }}>
                                            <h5 className="card-title">{product_name}</h5>
                                            </Link>
                                            <p className="price">Rp. {product_price}</p>
                                            <p className="text-muted">{product_brand}</p>
                                            <img src={ star } className="img-fluid" alt="b5" />
                                        </div>
                                    </Card>
                                )
                            }
                        )}
                    </div>
                </Container>
            </>
        )
    }
}
