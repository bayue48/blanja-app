import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../../src/assets";
import axios from "axios";
import "./auth.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Login = ({ login, isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [level, setLevel] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("Please wait");
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_API}/auth/login`, data)
      .then((res) => {
        const token = res.data.data.token;
        const id = res.data.data.id;
        const level = res.data.data.level;
        const name = res.data.data.name;
        const email = res.data.data.email;
        const img = res.data.data.img;
        login(token, id, level, name, email, img);
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMsg("Invalid email or password");
      });
  };

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Please login with your account</p>
        <div className="button-group">
          <div
            onClick={() => setLevel(2)}
            className={
              level === 2 ? "button button-full Links" : "button button-shadow"
            }
          >
            Customer
          </div>
          <div
            onClick={() => setLevel(1)}
            className={
              level === 1 ? "button button-full Links" : "button button-shadow"
            }
          >
            Seller
          </div>
        </div>
  
        <Form className="form-section" autoComplete="off">
        <p style={{ color: "red" }}>{errorMsg}</p>
          <div className="form-main">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-main">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </Form>
        <p className="forgot">
          <Link className="Link" to={{ pathname: "/forgot" }}>
            Forgot Password?
          </Link>
        </p>
        <div className="submit" type="submit" onClick={handleSubmit}>
          LOGIN
        </div>
        <p className="register">
          Don't have a Blanja account?{" "}
          <Link className="Link" to={{ pathname: "/signup" }}>
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token, id, level, name, email, img) =>
      dispatch(login(token, id, level, name, email, img)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
