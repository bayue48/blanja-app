import React, { useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../../src/assets";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = process.env.REACT_APP_API;

toast.configure();
const Reset = () => {
  const [isConfrim, setIsConfrim] = useState(false);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const email = sessionStorage.getItem("mail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass === "" || pass2 === "" || pass3 === "") {
      setErrMsg("Please input password");
    } else if (pass2 !== pass3) {
      setErrMsg("Password doesnt match");
    } else {
      const checkPass = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
      if (checkPass.test(pass2)) {
        setErrMsg(
          "Password must contain at least 1 number, and be longer than 8 character"
        );
      }
      const updatePassword = {
        // oldpass: pass,
        email: email,
        password: pass2,
      };
      await axios
        .patch(API + `/auth/reset`, updatePassword)
        .then(({ data }) => {
          toast.success("Success Reset Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          console.log("update password done", data);
          setIsConfrim(true);
          sessionStorage.clear();
        })
        .catch((err) => {
          toast.error("Failed Reset Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          console.log("eror password", err.response);
        });
    }
  };

  if (isConfrim === true) {
    return <Redirect to="/login" />;
  }
  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Please login with your account</p>
        <p className="confirm">
          You need to change your password to activate your account
        </p>
        <Form className="form-section">
          {errMsg === null ? null : <p style={{ color: "red" }}>{errMsg}</p>}
          <div className="form-main">
            <input
              type="password"
              placeholder="Old Password"
              name="Old Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <div className="form-main">
            <input
              type="password"
              placeholder="New Password"
              name="New Password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              required
            />
          </div>
          <div className="form-main">
            <input
              type="password"
              className="input-text"
              placeholder="Confrim New Password"
              name="Confrim New Password"
              value={pass3}
              onChange={(e) => setPass3(e.target.value)}
              required
            />
          </div>
        </Form>
        <div className="submit" type="submit" onClick={handleSubmit}>
          SUBMIT
        </div>
        <p className="register">
          Don't have a Tokopedia account?{" "}
          <Link className="Link" to={{ pathname: "/signup" }}>
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Reset;
