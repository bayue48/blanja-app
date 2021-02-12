import React, { Component } from 'react'
import { Row, Container, Form, Button } from 'react-bootstrap'
import { pencil } from '../../src/assets'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Rating from './rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const url = 'http://localhost:8000/api/v2/products/'

export default class product extends Component {
    constructor(props) {
        super(props);
    
        console.log(this.props)
    }
    state = {
        id: '',
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
        size: 0,
        qty: 0,
    }

    showHandler = () => {
        axios
            .get(`${process.env.REACT_APP_API}/products/` + this.props.id)
            .then(({ data }) => {
                this.setState({
                    product: data.data,
                });
                console.log(data)
            }).catch((err) => {
                console.log(err);
            })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.patch(`${process.env.REACT_APP_API}/products/` + this.props.id, this.state)
            .then(response => {
                console.log(response)
                toast('Success Update Product', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteHandle = () => {
        axios.delete(`${process.env.REACT_APP_API}/products/` + this.props.id)
            .then(response => {
                console.log(response)
                toast('Success Delete Product', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        // console.log(product)
        // console.log(this.props)
        const { name, brand, rating, desc, price, condition, image, id } = this.props
        const { product_name, product_brand, product_rating, product_desc, product_category, product_price, product_color, product_size, product_qty, product_img, product_condition } = this.state
        return (
            <Container>
                <Row className="d-flex" id={id}>
                    <div className="col-4">
                        <img className="img-fluid rounded" src={`${process.env.REACT_APP_API}` + image.split(',')[0]} style={{ width: '500px' }} alt="gambar" />
                        <div className="d-flex">
                            <img className="img-fluid rounded mt-2" src={`${process.env.REACT_APP_API}` + image.split(',')[1]} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={`${process.env.REACT_APP_API}` + image.split(',')[2]} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={`${process.env.REACT_APP_API}` + image.split(',')[3]} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={`${process.env.REACT_APP_API}` + image.split(',')[4]} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={`${process.env.REACT_APP_API}` + image.split(',')[0]} alt="img" style={{ width: "20%", margin: "1px" }} />
                        </div>
                    </div>
                    <div className="col-7 dtl-prdct">
                        <div className="btn d-flex justify-content-end">
                            <img src={pencil} alt="edit" onCklik={this.showHandler} data-toggle="modal" data-target="#EditModal" />
                            <FontAwesomeIcon icon={faTrash} onClick={this.deleteHandle} />
                        </div>
                        <p className="txt-name">{name}</p>
                        <p className="txt-brand text-muted">{brand}</p>
                            <Rating product_rating={rating}/>
                        <p className="txt-brand text-muted mt-2">Price</p>
                        <h2>Rp. {price}</h2>
                        <p className="mt-4" style={{ fontSize: "16px", fontWeight: "bold" }} >Color</p>
                        <Row className="justify-content-around ml-1" style={{ width: '200px' }}>
                            <Link>
                                <div className="clr-dtl" style={{ backgroundColor: '#1A1A1A' }}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl" style={{ backgroundColor: '#D84242' }}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl" style={{ backgroundColor: '#4290D8' }}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl" style={{ backgroundColor: '#42D86C' }}></div>
                            </Link>
                        </Row>
                        <div className="d-flex mt-4 justify-content-around" style={{ height: '80px', width: '380px' }}>
                            <div style={{ width: '150px' }}>
                                <p style={{ fontSize: "16px", fontWeight: 'bold' }}>Size</p>
                                <div className="d-flex justify-content-between" style={{ height: '36px', width: '150px' }}>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ size: this.state.size - 1 })}>
                                        <div className="btn-c" style={{ backgroundColor: '#D4D4D4' }}>-</div>
                                    </Link>
                                    <p>{this.state.size}</p>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ size: this.state.size + 1 })}>
                                        <div className="btn-c" style={{ backgroundColor: '#FFFFFF', border: "solid 1px" }}>+</div>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ width: '150px', marginLeft: '80px' }}>
                                <p style={{ fontSize: "16px", fontWeight: 'bold' }}>Jumlah</p>
                                <div className="d-flex justify-content-between" style={{ height: '36px', width: '150px' }}>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ qty: this.state.qty - 1 })}>
                                        <div className="btn-c" style={{ backgroundColor: '#D4D4D4' }}>-</div>
                                    </Link>
                                    <p>{this.state.qty}</p>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ qty: this.state.qty + 1 })}>
                                        <div className="btn-c" style={{ backgroundColor: '#FFFFFF', border: "solid 1px" }}>+</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Row className="mt-3">
                            <Link className="chat text-decoration-none d-flex">Chat</Link>
                            <Link className="add-bag text-decoration-none d-flex">Add bag</Link>
                            <Link className="buy-now text-decoration-none d-flex ">Buy Now</Link>
                        </Row>
                    </div>
                </Row>
                <div>
                    <h2 className="information">Informasi Product</h2>
                    <p className="condition">Condition</p>
                    <p className="v-condition">{condition}</p>
                    <p className="condition">Description</p>
                    <p className="v-description">{desc}</p>
                </div>
                <div>
                    <p className="prdct-revw">Product review</p>
                    <div className="ratee">
                        <div className="ratee-number">
                            <p className="txt-rating">{rating}<p className="per text-muted">/5</p> </p>
                            <div className="d-flex d-flex justify-content-center">
                                <Rating product_rating={rating}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditModalLabel">Edit Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
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
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
