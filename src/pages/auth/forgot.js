import React, { useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../assets";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Reset() {
  const [mail, setMail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isConfrim, setIsConfrim] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailer = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (!mail.match(mailer)) {
      setErrMsg("Invalid email format, ex: user@domain.com");
    } else if (mail === "") {
      setErrMsg("Please input email");
    } else {
      setErrMsg("Please Wait");
    }

    const data = {
      email: mail,
    };
    axios
      .post(`${process.env.REACT_APP_API}/auth/forgot`, data)
      .then(({ data }) => {
        toast.success("Success Send OTP", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        console.log("sukses kirim otp", data);
        setMail(mail);
        setIsConfrim(true);
        sessionStorage.setItem("mail", mail);
      })
      .catch((err) => {
        toast.error("Failed Send OTP", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        console.log(err.message);
      });
  };

  if (isConfrim === true) {
    return <Redirect to="/validation" />;
  }

  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Reset password</p>
        <Form className="form-section">
          {errMsg === null ? null : <p style={{ color: "red" }}>{errMsg}</p>}
          <div className="form-main">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setMail(e.target.value)}
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
}
