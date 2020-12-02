import React, { Component } from 'react'
import { Container, Form, Image } from 'react-bootstrap'
import { logos } from '../../src/assets'
// import './style.css'

export default class reset extends Component {
    render() {
        return (
            <Container className="auth">
                <div className="form-header">
                    <div className="img-container">
                    <Image src={ logos } alt="Logo" />
                    </div>
                    <p className="info">Reset password</p>
                    <Form className="form-section">
                        <div className="form-main">
                            <input type="email" placeholder="Email" name="uname" required />
                        </div>
                    </Form>
                    <a className="submit" href="confirm" type="submit">PRIMARY</a>
                    <p className="register">Don't have a Tokopedia account? <a href="signup">Register</a></p>
                </div>
            </Container>
        )
    }
}
