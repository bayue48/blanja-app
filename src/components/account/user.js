import React, { useState, useEffect } from "react";
import { Jumbotron, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { user } from "../../assets";
import Sidebar from "./sidebar";
import axios from "axios";
import "./user.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const API = process.env.REACT_APP_API;

toast.configure();
const User = () => {
  const level = useSelector((state) => state.auth.level);
  //   const img = useSelector((state) => state.auth.img);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);

  const getUser = async () => {
    await axios
      .get(`${API}/users/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const users = res.data.data;
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = window.addEventListener("focus", () => {
      getUser(users);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getUser(users);
  }, []);

  //   const name = useSelector((state) => state.auth.name);
  //   const email = useSelector((state) => state.auth.email);
  const [users, setUsers] = useState([]);
  const [uname, setUname] = useState("");
  const [mail, setMail] = useState("");
  const [ztore, setZtore] = useState("");
  const [number, setNumber] = useState("");
  const [desc, setDesc] = useState("");
  const [imagez, setImagez] = useState([]);
  const [addP, setAddP] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  console.log("ini users", users);
  console.log("ini avatar", imagez);
  console.log("ini nama", uname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailer = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (!mail.match(mailer)) {
      setErrMsg("Invalid email format, ex: user@domain.com");
    } else {
      const updateProfile = {
        name: uname,
        email: mail,
        phone: number,
        store: ztore,
        store_desc: desc,
      };

      await axios
        .patch(API + `/users/${id}`, updateProfile, {
          headers: {
            "x-access-token": "Bearer " + token,
          },
        })
        .then(({ data }) => {
          toast.success("Success Edit Profile", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          setAddP(true);
          console.log("update profile", data);
        })
        .catch((err) => {
          console.log("error update profile", err.response);
        });
    }
  };
  const inputRef = React.useRef();

  const handleFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let x = new FormData();
    for (let i = 0; i < imagez.length; i++) {
      x.append("img", imagez[i]);
    }
    for (var pair of x.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        "x-access-token": "Bearer " + token,
      },
    };

    await axios
      .patch(API + `/users/img/${id}`, x, config)
      .then((data) => {
        toast.success("Success Edit Photo", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setAddP(true);
        console.log("update photo", data);
        handleUpload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (addP === true) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <Sidebar />
      <Jumbotron className="container-content">
        <h3>My Profile</h3>
        <p className="font-p-title">Manage your profile information</p>
        <hr></hr>
        {users &&
          users.map(({ id, name, store, email, store_desc, phone, img }) => {
            console.log("id usersd", id);
            return (
              <>
                {level === 1 ? (
                  <div className="row">
                    <div className="col-md-8">
                      <Form key={id}>
                        <Form.Group as={Row} controlId="store">
                          <Form.Label column sm={3} className="mt-3">
                            Store Name
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              placeholder={store}
                              value={ztore}
                              onChange={(e) => {
                                setZtore(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                          <Form.Label column sm={3} className="mt-3">
                            Email
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="email"
                              placeholder={email}
                              value={mail}
                              onChange={(e) => {
                                setMail(e.target.value);
                              }}
                            />
                            {errMsg === null ? null : (
                              <p style={{ color: "red" }}>{errMsg}</p>
                            )}
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                          <Form.Label column sm={3} className="mt-3">
                            Phone Number
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="number"
                              placeholder={phone}
                              value={number}
                              onChange={(e) => {
                                setNumber(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="store_desc">
                          <Form.Label column sm={3} className="mt-n1">
                            Store description
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              placeholder={
                                store_desc !== undefined
                                  ? store_desc
                                  : "Description"
                              }
                              value={desc}
                              onChange={(e) => {
                                setDesc(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                          <Form.Label
                            column
                            sm={3}
                            className="mt-n5"
                          ></Form.Label>
                          <Col sm={9}>
                            <div
                              className="btn btn-danger"
                              style={{ marginTop: "30px" }}
                              onClick={(e) => {
                                handleSubmit(e);
                                // handleUpload(e);
                              }}
                            >
                              Save
                            </div>
                          </Col>
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="col-md-4 border-left">
                      <div className="d-flex justify-content-center mt-4">
                        <div className="dp-profil">
                          <img
                            src={
                              img !== null
                                ? `${process.env.REACT_APP_API}` + img
                                : user
                            }
                            className="img-profil"
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        {/* <input
                            type="file"
                            onChange={(e) => setImagez(e.target.files)}
                            ref={inputRef}
                            name="image"
                            style={{visibility: "hidden"}}
                          /> */}

                        {/* <div className="btn btn-light" onClick={handleFile}> */}
                        <div className="btn btn-light">Select Image</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-8">
                      <Form>
                        <Form.Group as={Row} controlId="name">
                          <Form.Label column sm={3} className="mt-3">
                            Name
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="text"
                              placeholder={name}
                              value={uname}
                              onChange={(e) => {
                                setUname(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                          <Form.Label column sm={3} className="mt-3">
                            Email
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="email"
                              placeholder={email}
                              value={mail}
                              onChange={(e) => {
                                setMail(e.target.value);
                              }}
                            />
                            {errMsg === null ? null : (
                              <p style={{ color: "red" }}>{errMsg}</p>
                            )}
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                          <Form.Label column sm={3} className="mt-3">
                            Phone Number
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control
                              type="number"
                              placeholder={phone !== null ? phone : "Number"}
                              value={number}
                              onChange={(e) => {
                                setNumber(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                          <Form.Label
                            column
                            sm={3}
                            className="mt-n5"
                          ></Form.Label>
                          <Col sm={9}>
                            <div
                              className="btn btn-danger"
                              style={{ marginTop: "30px" }}
                              onClick={handleSubmit}
                            >
                              Save
                            </div>
                          </Col>
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="col-md-4 border-left">
                      <div className="d-flex justify-content-center mt-4">
                        <div className="dp-profil">
                          <img
                            src={
                              img !== null
                                ? `${process.env.REACT_APP_API}` + img
                                : user
                            }
                            className="img-profil"
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <div className="btn btn-light">Select Image</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </Jumbotron>
    </div>
  );
};

export default User;
