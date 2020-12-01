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
            product_category: '',
            product_price: '',
            product_desc: '',
            product_img: '',
        }
    }
    

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
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
        
        const { product_name, product_category, product_price, product_desc, product_img } = this.state
        console.log(this.state)
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" name='product_name' value={product_name} onChange={this.changeHandler} placeholder="Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                        <Form.Label>category</Form.Label>
                        <Form.Control type="text" name='product_category' value={product_category} onChange={this.changeHandler} placeholder="Category" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>price</Form.Label>
                        <Form.Control type="text" name='product_price' value={product_price} onChange={this.changeHandler} placeholder="Price" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>desc</Form.Label>
                        <Form.Control type="text" name='product_desc' value={product_desc} onChange={this.changeHandler} placeholder="Desc" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>image</Form.Label>
                        <Form.Control type="text" name='product_img' value={product_img} onChange={this.changeHandler} placeholder="Image" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
