import React, { Component } from 'react'
import { Jumbotron, Form, Row, Col } from 'react-bootstrap'
import Sidebar from './sidebar'
import './user.css'

export default class user extends Component {
    render() {
        return (
            <div style={{display: "flex", backgroundColor: "#fff"}}>
                <Sidebar />
                    <Jumbotron className="container-content">
                        <h3>My profile store</h3>
                        <p className="font-p-title">Manage your profile information</p>
                        <hr></hr>

                        <div className="row">
                            <div className="col-md-8">
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalPassword">
                                        <Form.Label column sm={3} className="mt-3">
                                            Store Name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" value="Johanes Mikael" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalPassword">
                                        <Form.Label column sm={3} className="mt-3">
                                            Email
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="email" value="johanes@gmail.com" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalPassword">
                                        <Form.Label column sm={3} className="mt-3">
                                            Phone Number
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" value="08901289012" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalPassword">
                                        <Form.Label column sm={3} className="mt-n1">
                                            Store description
                                        </Form.Label>
                                        <Col sm={9}>
                                            <textarea>
                                            </textarea>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalPassword">
                                        <Form.Label column sm={3} className="mt-n5">
                                        </Form.Label>
                                        <Col sm={9}>
                                            <div className="btn-login-nav">Save</div>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="col-md-4 border-left">
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="dp-profil">
                                        <img className="img-profil" alt="" />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="btn-signup-nav">Select Image</div>
                                </div>
                            </div>
                        </div>

                    </Jumbotron>
            </div>
        )
    }
}
