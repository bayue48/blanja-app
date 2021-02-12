import React, { Component } from 'react'
import Rating from '../components/rating'
import Navbar from '../components/navbar'
import axios from 'axios'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const getUrl = 'http://localhost:8000/search?category='

export default class category extends Component {
    state = {
        products: {},
        id: '',

    }

    getCategory = () => {
        const { match } = this.props;
        axios
            .get(getUrl + match.params.id)
            .then(({ data }) => {
                this.setState({
                    products: data.data,
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    componentDidMount = () => {
        this.getCategory()
    }

    render() {
        const { products } = this.state;
        console.log(products)
        const { match } = this.props;
        console.log(match)
        return (
            <>
                <Navbar />
                <Container>
                    <div className="row ml-2">
                    {products.products && products.products.map(
                            ({product_name, product_price, product_brand, product_img, product_rating, id} ) => {
                                return(
                                    <Card className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded" id="cards" key={id}>
                                        <img src={`${process.env.REACT_APP_API}` + product_img.split(',')[0]} className="card-img-top" style={{maxHeight: "50%"}} alt="..."/>
                                    
                                        <div className="card-body">
                                            <Link to={{
                                                        pathname:`/detail/${id}`,
                                                        state: this.state
                                                    }}>
                                            <h5 className="card-title">{product_name}</h5>
                                            </Link>
                                            <p className="price">Rp. {product_price}</p>
                                            <p className="text-muted">{product_brand}</p>
                                            <Rating product_rating={product_rating}/>
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