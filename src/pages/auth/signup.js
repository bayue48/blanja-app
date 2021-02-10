import React, { Component } from 'react'
import { Container, Form, Image } from 'react-bootstrap'
import { logos } from '../../../src/assets'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
    handleSubmit = (e) => {
        const data = {
            level_id: 2,
            name: this.name,
            email: this.email,
            password: this.password
        }
        axios.post(`${process.env.REACT_APP_API}/api/v2/auth/register`, data)
            .then(({ data }) => {
                toast('Register Success', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                window.location.href = "/login"
            }).catch((error) => {
                toast('Register Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
    }
    render() {
        return (
            <Container className="auth">
                <div className="form-header">
                    <div className="img-container">
                        <Image src={logos} alt="Logo" />
                    </div>
                    <p className="info">Please sign up with your account</p>
                    <div className="button-group">
                        <a href=" " className="button button-full">Customer</a>
                        <a href=" " className="button button-shadow">Seller</a>
                    </div>
                    <Form className="form-section">
                        <div className="form-main">
                            <input type="name" placeholder="Name" name="uname" required onChange={(e) => (this.name = e.target.value)} />
                        </div>
                        <div className="form-main">
                            <input type="email" placeholder="Email" name="email" required onChange={(e) => (this.email = e.target.value)} />
                        </div>
                        <div className="form-main">
                            <input type="password" placeholder="Password" name="psw" onChange={(e) => (this.password = e.target.value)} required />
                        </div>
                        <a className="submit" type="submit" onClick={this.handleSubmit}>REGISTER</a>
                    </Form>
                    <p className="register">Already have a Tokopedia account? <a href="login">Login</a></p>
                </div>
            </Container>
        )
    }
}


const mapStateToProps = ({ bag }) => {
    return {
        bag
    };
};

export default connect(mapStateToProps)(Register);