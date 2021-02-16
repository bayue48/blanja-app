import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const qs = require('querystring')

const FormData = require('form-data')

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        "x-access-token": "Bearer " + localStorage.getItem("token")
    },
}
console.log(config)

export default class addProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: '',
            seller_id: 1,
            product_brand: '',
            product_rating: 1,
            product_desc: '',
            product_category: '',
            product_price: '',
            product_color: '',
            product_size: '',
            product_qty: '',
            product_img: [],
            product_condition: '',
        }
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFile(e) {
        let product_img = e.target.files
        this.setState({ product_img: product_img })
    }

    submitHandler = e => {
        // let params = {
        //     product_name: this.state.product_name,
        //     product_brand: this.state.product_brand,
        //     product_rating: this.state.product_rating,
        //     product_desc: this.state.product_desc,
        //     product_category: this.state.product_category,
        //     product_price: this.state.product_price,
        //     product_color: this.state.product_color,
        //     product_size: this.state.product_size,
        //     product_qty: this.state.product_qty,
        //     product_img: this.state.product_img,
        //     product_condition: this.state.product_condition,
        // }

        let formdata = new FormData()
        formdata.append('product_name', this.state.product_name)
        formdata.append('product_brand', this.state.product_brand)
        formdata.append('product_rating', this.state.product_rating)
        formdata.append('product_desc', this.state.product_desc)
        formdata.append('product_category', this.state.product_category)
        formdata.append('product_price', this.state.product_price)
        formdata.append('product_color', this.state.product_color)
        formdata.append('product_size', this.state.product_size)
        formdata.append('product_condition', this.state.product_condition)
        // for (let i = 0; i < params.product_img.length; i++) {
            // formdata.append("product_img", params.product_img[i])
        // }

        e.preventDefault()
        // console.log(formdata.values())
        // for (let i of formdata.values()) {
        //     console.log(i)
        // }
        axios.post(`${process.env.REACT_APP_API}/api/v2/products`, formdata, config)
            .then(response => {
                console.log(response)
                // alert('Data sukses diInputkan')
                // window.location.href = 'http://localhost:3000/product/listProduct'
            })
            .catch(error => {
                console.log(error)
            })
    }
    // submitHandler = (e) => {
    //     e.preventDefault()
    //     console.log(this.state)
    //     axios.post(`${process.env.REACT_APP_API}/api/v2/products`, qs.stringify(this.state), config)
    //         .then(response => {
    //             console.log(response)
    //             alert('Data sukses diInputkan')
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    render() {

        const { product_name, product_brand, product_rating, product_desc, product_category, product_price, product_color, product_size, product_qty, product_img, product_condition } = this.state
        console.log(this.state.product_img)
        return (
            <div className="card shadow mb4" style={{ width: "99%", height: "100%" }}>
                <div className="card-body">
                    <Form encType="multipart/form-data" onSubmit={this.submitHandler}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Prouct Name</Form.Label>
                            <Form.Control type="text" name='product_name' value={product_name} onChange={this.changeHandler} placeholder="Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" name='product_brand' value={product_brand} onChange={this.changeHandler} placeholder="Brand" />
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
                            <Form.Control multiple type="file" name='product_img' value={product_img} onChange={this.changeHandler} placeholder="Image" />
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
            </div>
        )
    }
}
