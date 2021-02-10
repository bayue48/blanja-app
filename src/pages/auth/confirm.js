import React from 'react'
import { Container, Form, Image } from 'react-bootstrap'
import { logos } from '../../../src/assets'

export default function confirm() {
    return (
        <Container className="auth">
            <div className="form-header">
                <div className="img-container">
                    <Image src={logos} alt="Logo" />
                </div>
                <p className="info">Please login with your account</p>
                <p className="confirm">You need to change your password to activate your account</p>
                <Form className="form-section">
                    <div className="form-main">
                        <input type="password" placeholder="Password" name="psw" required />
                    </div>
                    <div className="form-main">
                        <input type="password" placeholder="Confirm New Password" name="psw" required />
                    </div>
                </Form>
                <a className="submit" href="login" type="submit">PRIMARY</a>
                <p className="register">Don't have a Tokopedia account? <a href="signup">Register</a></p>
            </div>
        </Container>
    )
}
