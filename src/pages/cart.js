import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { gez } from '../../src/assets'
import Navbar from '../components/navbar'
import { Container } from 'react-bootstrap'

class Cart extends Component {
    state = {
        count: 0,
    }

    increment = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };

    decrement = () => {
        this.setState(prevState => ({
            count: Math.max(prevState.count - 1, 0)
        }));
    };


    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <h1 style={{fontSize: '34px', fontWeight:'700'}}>My Bag</h1>
                    <div className="d-flex ">
                        <div className="left">
                            <div className='col chart justify-content-between'>
                                <div className="selectAll">
                                    <div className="mt-3">
                                        <input type="checkbox" className="cek" />
                                    </div>
                                    <p className="ml-3 selectitem">Select all items (2 items selected)</p>
                                </div>
                                <Link>
                                    <p style={{color: '#DB3022', marginTop:'10px'}}>Delete</p>
                                </Link>
                            </div>
                            <div className='col prodct justify-content-between'>
                                <div className="selectAll">
                                    <div className="mt-3">
                                        <input type="checkbox" className="cek" />
                                    </div>
                                    <div className="img-chart">
                                        <img style={{height: '70px'}} src={gez} alt=""/>
                                    </div>
                                    <div className="ml-3">
                                        <p className="name-prodct">Men's formal suit - Black</p>
                                        <p className="brand-product text-muted">Zalora Cloth</p>
                                    </div>
                                    <div className="d-flex justify-content-between ml-5 mt-3" style={{height:'36px', width:'150px'}}>
                                        <button className="minus2 mr-2" onClick={this.decrement}>
                                            <div  style={{backgroundColor:'#D4D4D4'}}>-</div>
                                        </button>
                                            <p>{this.state.count}</p>
                                        <button className="minus2 mr-2" onClick={this.increment}>
                                            <div  style={{backgroundColor:'#FFFFFF', border:"solid 1px"}}>+</div>
                                        </button>
                                        
                                    </div>
                                </div>
                                <p className="prc">Rp.200000</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className='shop-sumry'>
                                <p className="smry-title">Shopping summary</p>
                                <div className="ttl-price">
                                    <p className="text-price text-muted">Total price</p>
                                    <p className="pay">Rp.200.000</p>
                                </div>
                                <Link className="text-decoration-none" to="/checkout">
                                <div className="btn-buy">
                                    <p className="text-buy">Buy</p>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}


export default Cart