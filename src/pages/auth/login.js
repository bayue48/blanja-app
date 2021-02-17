import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../../src/assets";
import axios from "axios";
import "./auth.css";

const Login = ({ login, isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [level, setLevel] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        login(token, id, level, name, email);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMsg("*Invalid email or password");
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
          <p className="ErrorMsg">{errorMsg}</p>
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
          <Link className="Link" to={{ pathname: "/reset" }}>
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
    login: (token, id, level, name, email) =>
      dispatch(login(token, id, level, name, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//             <Container className="auth">
//                 {auth.isLogin && <Redirect to="/" />}
//                 <div className="form-header">
//                     <div className="img-container">
//                         <Image src={logos} alt="Logo" />
//                     </div>
//                     <p className="info">Please login with your account</p>
//                     <div className="button-group">
//                         <a href=" " className="button button-full">Customer</a>
//                         <a href=" " className="button button-shadow">Seller</a>
//                     </div>
//                     <Form className="form-section" autoComplete="off">
//                         <div className="form-main">
//                             <input type="email" placeholder="Email" name="email" required onChange={(e) => (this.email = e.target.value)} />
//                         </div>
//                         <div className="form-main">
//                             <input type="password" placeholder="Password" name="psw" required onChange={(e) => (this.password = e.target.value)} />
//                         </div>
//                     </Form>
//                     <a className="forgot" href="reset">Forgot password?</a><br></br>
//                     <a className="submit" type="submit" onClick={this.handleSubmit}>LOGIN</a>
//                     <p className="register">Don't have a Tokopedia account? <a href="signup">Register</a></p>
//                 </div>
//             </Container>
//         )
//     }
// }

// const mapStateToProps = ({ auth }) => {
//     return {
//         auth,
//     };
// };

// export default connect(mapStateToProps)(Login);
