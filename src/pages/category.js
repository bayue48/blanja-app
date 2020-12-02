import React, { Component } from 'react';
import { gez, star } from '../../src/assets'
import Navbar from '../components/navbar'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const getUrl = 'http://localhost:8000/api/v2/search?'
const urlParams = new URLSearchParams(window.location.search)

let title  = ''
let paramSearch = ''

console.log(typeof(urlParams))
console.log(urlParams)
if(urlParams.has('category')){
    title = 'Category '
}


if(urlParams.get('category') === '1'){
    title += 'T-shirt'
}else if(urlParams.get('category') === '2'){
    title += 'Short'
}else if(urlParams.get('category') === '3'){
    title += 'Jacket'
}else if(urlParams.get('category') === '4'){
    title += 'Pants'
}else if(urlParams.get('category') === '5'){
    title += 'Shoes'
}else{
    title += ''
}


export default class SearchPage extends Component {
    state = {
        items: [],
    }

    getItemsCategory = () => {
        axios.get(getUrl + urlParams)
            .then(({ data }) => {
                this.setState({
                    items: data.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    componentDidMount = () => {
        this.getItemsCategory()
        console.log("didMount")
    }

    render() {
        console.log(this.state.items)
        console.log("render")
        const {items} = this.state
        return (
            <>
                <div className="container">
                    <Navbar />
                    <br></br>
                    <h2>{title}</h2>
                    <br></br>
                    <div className="row ml-2">
                        {
                            items && items.map(({ id, product_name, product_brand, product_price }) => {
                                return (
                                    <Card className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded" id="cards" key={id}>
                                        <img src={ gez } className="card-img-top" alt="..."/>
                                    
                                        <div className="card-body">
                                            <Link to={{
                                                        pathname:`/detail/${id}`,
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
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}