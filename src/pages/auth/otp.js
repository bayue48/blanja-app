import React, { useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { logos } from "../../assets";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Otp() {
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      otp: otp,
    };
    await axios
      .post(`${process.env.REACT_APP_API}/auth/otp`, data)
      .then(async ({ data }) => {
        toast.success("Success Validation", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        console.log("sukses input", data);
        await history.push("/reset");
      })
      .catch((e) => {
        if (e.response.data.error === "Wrong OTP") {
          setErrMsg("Wrong Code");
        }
      });
  };

  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Code Validation</p>
        <Form className="form-section">
          {errMsg === null ? null : <p style={{ color: "red" }}>{errMsg}</p>}
          <div className="form-main">
            <input
              type="name"
              placeholder="6 Digit Code"
              onChange={(e) => setOtp(e.target.value)}
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
