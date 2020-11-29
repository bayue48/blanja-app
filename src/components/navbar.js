import React, { Component } from 'react'
import { logo, search, filter, cart } from '../../src/assets'
import { Nav, Navbar, Container, InputGroup, Image } from 'react-bootstrap'

export default class navbar extends Component {
    render() {
        return (
            <Nav className="sticky-top navbar-expand-lg navbar-light bg-light shadow rounded p-3 mb-5">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={logo}  alt="Brand" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex flex-row">
                            <InputGroup>
                                <input type="text" className="form-control search-form py-2 border-right-0" placeholder="Search" />
                                <span className="input-group-append">
							        <div className="input-group-text search-btn bg-white">
                                        <image src={search} alt="Search" />
							        </div>
						        </span>
                            </InputGroup>
                            <div className="filter">
						        <a href="#filter" className="btn filter-btn">
                                    <Image src={filter} alt="Filter" />
						        </a>
					        </div>
                        </div>          
                        <div className="d-flex flex-row justify-content-end align-items-center">
						    <div className="cart">
							    <a className="btn cart-btn" href="#cart">
                                <Image src={cart} alt="Cart" />
							    </a>
						    </div>
					        <div className="login">
						        <a href="login.html" className="btn btn-full" type="submit">Login</a>
					        </div>
					        <div className="signup">
						        <a href="signup.html" className="btn btn-shadow ml-4" type="submit">Signup</a>
					        </div>
				        </div>
                    </Navbar.Collapse>
                </Container>
            </Nav>
        )
    }
}
