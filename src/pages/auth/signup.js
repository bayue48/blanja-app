import React, { useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../../src/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [store, setStore] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(2);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailer = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    const passer = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
    if (email === "" || name === "") {
      setErrMsg("Please input all fields");
    } else if (password === "" || !password.match(passer)) {
      setErrMsg(
        "Password must contain at least 1 number, and be longer than 8 character"
      );
    } else if (!email.match(mailer)) {
      setErrMsg("Invalid email format, ex: user@domain.com");
    } else {
        setErrMsg("Please wait");
      const data = {
        name: name,
        email: email,
        store: store,
        phone: number,
        level_id: type,
        password: password,
      };
      await axios
        .post(`${process.env.REACT_APP_API}/auth/register`, data)
        .then(({ data }) => {
          toast.success("Register Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("sukses", data);
          window.location.href = "/login";
        })
        .catch((e) => {
          if (e.response.data.error === "Email already in use!") {
            setErrMsg("Email is already registred");
          } else {
            setErrMsg("Something went wrong");
          }
        });
    }
  };
  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Please sign up with your account</p>
        <div className="button-group">
          <div
            onClick={() => setType(2)}
            className={
              type === 2 ? "button button-full Links" : "button button-shadow"
            }
          >
            Customer
          </div>
          <div
            onClick={() => setType(1)}
            className={
              type === 1 ? "button button-full Links" : "button button-shadow"
            }
          >
            Seller
          </div>
        </div>
        <Form className="form-section">
        {errMsg === null ? null : <p style={{ color: "red" }}>{errMsg}</p>}
          <div className="form-main">
            <input
              type="name"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-main">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {type === 1 && (
            <>
              <div className="form-main">
                <input
                  type="name"
                  id="phone"
                  placeholder="Phone number"
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-main">
                <input
                  type="name"
                  id="store"
                  placeholder="Store name"
                  onChange={(e) => setStore(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-main">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit" type="submit" onClick={handleSubmit}>
            REGISTER
          </div>
        </Form>
        <p className="register">
          Already have a Tokopedia account?{" "}
          <Link className="Link" to={{ pathname: "/login" }}>
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
}
