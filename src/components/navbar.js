import React, { Component } from 'react'
import { logo, filter, cart } from '../../src/assets'
import { Navbar, Container, InputGroup, Image, FormControl, Nav } from 'react-bootstrap'

export default class navbar extends Component {
    render() {
        return (
            <Navbar expand="md lg" className="sticky-top navbar-light bg-light shadow rounded p-3 mb-5">
                <Container>
                    <Navbar.Brand href="/">
                        <Image src={logo}  alt="Brand" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <div className="d-flex flex-row justify-content-center">
                                <InputGroup>
                                    <FormControl className="search-form py-2 border-right-0"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append className="input-group-text search-btn bg-white">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                        </svg>
                                    </InputGroup.Append>
                                </InputGroup>
                            <div className="btn filter-btn">
                                <Image src={filter} alt="Filter" />
                            </div>
                        </div>
                        <Nav className="mr-auto d-flex flex-row justify-content-center align-items-center">
						    <div className="cart">
							    <a className="btn cart-btn" href="cart">
                                <Image src={cart} alt="Cart" />
							    </a>
						    </div>
					        <div className="login">
						        <a href="login" className="btn btn-full" type="submit">Login</a>
					        </div>
					        <div className="signup">
						        <a href="signup" className="btn btn-shadow ml-4" type="submit">Signup</a>
					        </div>
				        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
