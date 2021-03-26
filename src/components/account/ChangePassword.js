import React, { useState } from "react";
import { logos } from "../../assets";
import { useSelector } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../pages/auth/auth.css";
import { Container, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = process.env.REACT_APP_API;

toast.configure();
const ChangePassword = () => {
  const [isConfrim, setIsConfrim] = useState(false);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

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
      const config = {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      };
      const updatePassword = {
        // oldpass: pass,
        email: email,
        password: pass2,
      };
      await axios
        .patch(API + `/auth/reset`, updatePassword, config)
        .then(({ data }) => {
          toast.success("Success Change Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          console.log("update password done", data);
          setIsConfrim(true);
        })
        .catch((err) => {
          console.log("eror password", err.response);
        });
    }
  };

  if (isConfrim === true) {
    return <Redirect to="/account" />;
  }

  return (
    <Container className="auth">
      <div className="form-header">
        <div className="img-container">
          <Image src={logos} alt="Logo" />
        </div>
        <p className="info">Change password</p>
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
      </div>
    </Container>
  );
};

export default ChangePassword;
