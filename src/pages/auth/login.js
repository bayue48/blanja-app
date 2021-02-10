import React, { Component } from 'react'
import { Container, Form, Image } from 'react-bootstrap'
import { logos } from '../../../src/assets'
import { setLoginTrue } from '../.././redux/actions/auth'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    handleSubmit = (e) => {
        const { dispatch, auth } = this.props;
        const data = {
            email: this.email,
            password: this.password,
        };
        e.preventDefault()
        axios
            .post(`${process.env.REACT_APP_API}/api/v2/auth/login`, data)
            .then((res) => {
                console.log(res.data.data.data.token)
                console.log(data.email)
                this.props.dispatch(setLoginTrue())
                localStorage.setItem("token", res.data.data.data.token);
                localStorage.setItem('email', data.email)
                // localStorage.setItem('id', res.data.data.data.id)
                // localStorage.setItem('level_id', res.data.data.data.level_id)
                res.headers["x-access-token"] = res.data.data.data.token;

                console.log(auth.isLogin);
                console.log(this.props.auth);
                console.log(res);
                console.log(res.headers);
                console.log(localStorage)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        const { dispatch, auth } = this.props;
        return (
            <Container className="auth">
                {auth.isLogin && <Redirect to="/" />}
                <div className="form-header">
                    <div className="img-container">
                        <Image src={logos} alt="Logo" />
                    </div>
                    <p className="info">Please login with your account</p>
                    <div className="button-group">
                        <a href=" " className="button button-full">Customer</a>
                        <a href=" " className="button button-shadow">Seller</a>
                    </div>
                    <Form className="form-section" autoComplete="off">
                        <div className="form-main">
                            <input type="email" placeholder="Email" name="email" required onChange={(e) => (this.email = e.target.value)} />
                        </div>
                        <div className="form-main">
                            <input type="password" placeholder="Password" name="psw" required onChange={(e) => (this.password = e.target.value)} />
                        </div>
                    </Form>
                    <a className="forgot" href="reset">Forgot password?</a><br></br>
                    <a className="submit" type="submit" onClick={this.handleSubmit}>LOGIN</a>
                    <p className="register">Don't have a Tokopedia account? <a href="signup">Register</a></p>
                </div>
            </Container>
        )
    }
}



const mapStateToProps = ({ auth }) => {
    return {
        auth,
    };
};

export default connect(mapStateToProps)(Login);
