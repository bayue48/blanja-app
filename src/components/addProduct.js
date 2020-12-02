import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const qs = require('querystring')

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export default class addProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: '', 
            product_brand: '', 
            product_rating: '', 
            product_desc: '', 
            product_category: '', 
            product_price: '', 
            product_color: '', 
            product_size: '', 
            product_qty: '', 
            product_img: '', 
            product_condition: '',
        }
    }
    

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8000/api/v2/products', qs.stringify(this.state), config)
            .then(response => {
                console.log(response)
                alert('Data sukses diInputkan')
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        
        const { product_name, product_brand, product_rating, product_desc, product_category, product_price, product_color, product_size, product_qty, product_img, product_condition } = this.state
        console.log(this.state)
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Prouct Name</Form.Label>
                        <Form.Control type="text" name='product_name' value={product_name} onChange={this.changeHandler} placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Brand Name</Form.Label>
                        <Form.Control type="text" name='product_brand' value={product_brand} onChange={this.changeHandler} placeholder="Brand" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" name='product_rating' value={product_rating} onChange={this.changeHandler} placeholder="Rating" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control type="text" name='product_desc' value={product_desc} onChange={this.changeHandler} placeholder="Description" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control type="number" name='product_category' value={product_category} onChange={this.changeHandler} placeholder="Category" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="number" name='product_price' value={product_price} onChange={this.changeHandler} placeholder="Price" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Color</Form.Label>
                        <Form.Control type="number" name='product_color' value={product_color} onChange={this.changeHandler} placeholder="Color" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Size</Form.Label>
                        <Form.Control type="number" name='product_size' value={product_size} onChange={this.changeHandler} placeholder="Size" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type="number" name='product_qty' value={product_qty} onChange={this.changeHandler} placeholder="Quantity" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="text" name='product_img' value={product_img} onChange={this.changeHandler} placeholder="Image" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Product Condition</Form.Label>
                        <Form.Control type="text" name='product_condition' value={product_condition} onChange={this.changeHandler} placeholder="Condition" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
