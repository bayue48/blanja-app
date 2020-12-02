import React, { Component } from 'react'
import { Row, Container } from 'react-bootstrap'
import { star, one, two, three, four, five } from '../../src/assets'
import { Link } from 'react-router-dom'

export default class product extends Component {
    constructor(props){
        super(props);
        this.state = {
            size : 0,
            qty : 0,
        }
    }

    render() {
        const {name, brand, rating, desc, price, condition, id} = this.props
        return (
            <Container>
                <Row className="d-flex" key={id}>
                    <div className="col-4">
                        <img className="img-fluid rounded" src={one} style={{width: '500px'}} alt="gambar" />
                        <div className="d-flex">
                            <img className="img-fluid rounded mt-2" src={two} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={three} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={four} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={five} alt="img" style={{ width: "20%", margin: "1px" }} />
                            <img className="img-fluid rounded mt-2" src={one} alt="img" style={{ width: "20%", margin: "1px" }} />
                        </div>
                    </div>
                    <div className="col-7 dtl-prdct">
                        <p className="txt-name">{name}</p>
                        <p className="txt-brand text-muted">{brand}</p>
                        <img src={ star } className="img-fluid" alt="b5" />
                        <p className="txt-brand text-muted mt-2">Price</p>
                        <h2>Rp. {price}</h2>
                        <p className="mt-4" style={{fontSize:"16px", fontWeight:"bold"}} >Color</p>
                        <Row className="justify-content-around ml-1" style={{width:'200px'}}>
                            <Link>
                                <div className="clr-dtl" style={{backgroundColor:'#1A1A1A'}}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl" style={{backgroundColor:'#D84242'}}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl"style={{backgroundColor:'#4290D8'}}></div>
                            </Link>
                            <Link>
                                <div className="clr-dtl" style={{backgroundColor:'#42D86C'}}></div>
                            </Link>
                        </Row>
                        <div className="d-flex mt-4 justify-content-around" style={{height:'80px', width:'380px'}}>
                            <div style={{width:'150px'}}>
                                <p style={{fontSize:"16px", fontWeight:'bold'}}>Size</p>
                                <div className="d-flex justify-content-between" style={{height:'36px', width:'150px'}}>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ size: this.state.size - 1 })}>
                                        <div className="btn-c" style={{backgroundColor:'#D4D4D4'}}>-</div>
                                    </Link>
                                        <p>{this.state.size}</p>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ size: this.state.size + 1 })}>
                                        <div className="btn-c" style={{backgroundColor:'#FFFFFF', border:"solid 1px"}}>+</div>
                                    </Link>
                                </div>
                            </div>
                            <div style={{width:'150px', marginLeft:'80px'}}>
                                <p style={{fontSize:"16px", fontWeight:'bold'}}>Jumlah</p>
                                <div className="d-flex justify-content-between" style={{height:'36px', width:'150px'}}>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ qty: this.state.qty - 1 })}>
                                        <div className="btn-c" style={{backgroundColor:'#D4D4D4'}}>-</div>
                                    </Link>
                                        <p>{this.state.qty}</p>
                                    <Link className="text-decoration-none" onClick={() => this.setState({ qty: this.state.qty + 1 })}>
                                        <div className="btn-c" style={{backgroundColor:'#FFFFFF', border:"solid 1px"}}>+</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Row className="mt-3">
                            <Link  className="chat text-decoration-none d-flex">Chat</Link>
                            <Link  className="add-bag text-decoration-none d-flex">Add bag</Link>
                            <Link  className="buy-now text-decoration-none d-flex ">Buy Now</Link>
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
                                <img src={ star } className="img-fluid" alt="b5" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
