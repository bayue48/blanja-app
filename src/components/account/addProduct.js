import React, { useState } from "react";
import { Jumbotron, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "./sidebar";
import Navbar from "../navbar";
import formattext from "../../assets/formattext.png";
import main from "../../assets/mainphoto.png";
import secondary from "../../assets/secondaryphoto.png";
import styles from "./styling.module.css";
import "./add.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const API = process.env.REACT_APP_API;

toast.configure();
const AddProduct = () => {
  const id = useSelector((state) => state.auth.id);

  const [addP, setAddP] = useState(false);
  const [filePath, setFilePath] = useState([]);
  const [prodName, setProdName] = useState("");
  const [size, setSize] = useState(1);
  const [color, setColor] = useState(1);
  const [prodPrice, setProdPrice] = useState("");
  const [prodQty, setProdQty] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [userId, setUserId] = useState(id);
  const [rate, setRate] = useState(0);
  const [ctg, setCtg] = useState(1);
  const [cnd, setCnd] = useState(1);

  console.log("size", size);
  console.log("color", color);
  console.log("image", filePath);
  console.log("name", prodName);
  console.log("price", prodPrice);
  console.log("qty", prodQty);
  console.log("desc", prodDesc);
  console.log("uid", userId);
  console.log("rate", rate);
  console.log("category", ctg);
  console.log("condition", cnd);

  const token = useSelector((state) => state.auth.token);

  const inputRef = React.useRef();
  const handleFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("product_name", prodName);
    data.append("product_category", ctg);
    data.append("product_size", size);
    data.append("product_color", color);
    data.append("product_condition", cnd);
    data.append("product_price", prodPrice);
    data.append("product_qty", prodQty);
    data.append("product_rating", rate);
    data.append("user_id", userId);
    data.append("product_desc", prodDesc);
    for (let i = 0; i < filePath.length; i++) {
      data.append("product_img", filePath[i]);
    }
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }

    await axios
      .post(API + "/products", data, {
        headers: {
          "x-access-token": "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Success Add Product", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setAddP(true);
      })
      .catch((err) => {
        console.log("bisa error", err.response);
      });
  };

  if (addP === true) {
    return <Redirect to="/account/product" />;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling">
          <input
            multiple
            type="file"
            onChange={(e) => setFilePath(e.target.files)}
            ref={inputRef}
            name="image"
            className={styles.hiddeninput}
          />
          <Form>
            <Jumbotron className="container-content">
              <h3>Inventory</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="product_name">
                    <Form.Label>
                      Name of goods
                    </Form.Label>
                    <Form.Control
                      placeholder="Product Name"
                      value={prodName}
                      onChange={(e) => {
                        setProdName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Item details</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="product_price">
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control
                      placeholder="Price"
                      type="number"
                      value={prodPrice}
                      onChange={(e) => {
                        setProdPrice(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="product_stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      placeholder="Stock Product"
                      value={prodQty}
                      type="number"
                      onChange={(e) => {
                        setProdQty(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <div className="form-group">
                    <label>Category</label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={ctg}
                      onChange={(e) => {
                        setCtg(e.target.value);
                      }}
                    >
                      <option value={1}>T-Shirt</option>
                      <option value={2}>Shorts</option>
                      <option value={3}>Jacket</option>
                      <option value={4}>Pants</option>
                      <option value={5}>Shoes</option>
                      <option value={6}>High heels</option>
                      <option value={7}>Wristwatch</option>
                      <option value={8}>Handbag</option>
                      <option value={9}>Bagpack</option>
                      <option value={10}>Socks</option>
                      <option value={11}>Glasses</option>
                      <option value={12}>Cap</option>
                      <option value={13}>Tie</option>
                      <option value={14}>Dress</option>
                      <option value={15}>Formal suit</option>
                      <option value={16}>Accessories</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Color</label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={color}
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                    >
                      <option value={1}>Black</option>
                      <option value={2}>White</option>
                      <option value={3}>Red</option>
                      <option value={4}>Green</option>
                      <option value={5}>Blue</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Size</label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    >
                      <option value={1}>XS</option>
                      <option value={2}>S</option>
                      <option value={3}>M</option>
                      <option value={4}>L</option>
                      <option value={5}>XL</option>
                      <option value={6}>38</option>
                      <option value={7}>39</option>
                      <option value={8}>40</option>
                      <option value={9}>41</option>
                      <option value={10}>42</option>
                      <option value={11}>43</option>
                      <option value={12}>44</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Conditions Product </label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={cnd}
                      onChange={(e) => {
                        setCnd(e.target.value);
                      }}
                    >
                      <option value={1}>New</option>
                      <option value={2}>Second</option>
                    </select>
                  </div>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Photo of goods</h3>
              <div className={styles.formcontainer}>
                <div className={(styles.form, styles.formcontainer_img)}>
                  <div className={styles.content_img}>
                    <div className={styles.main_img}>
                      <div className={styles.containerMainImg}>
                        <img
                          className={styles.mainImg}
                          src={
                            filePath[0]
                              ? URL.createObjectURL(filePath[0])
                              : main
                          }
                          alt=""
                        />
                      </div>
                      <p className={styles.mainPhoto}>Foto utama</p>
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[1]
                            ? URL.createObjectURL(filePath[1])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[2]
                            ? URL.createObjectURL(filePath[2])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[3]
                            ? URL.createObjectURL(filePath[3])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[4]
                            ? URL.createObjectURL(filePath[4])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.edit_img}>
                    <button onClick={handleFile} className={styles.btnupload}>
                      Upload image
                    </button>
                  </div>
                </div>
              </div>
            </Jumbotron>

            <Jumbotron className="container-gap">
              <h3>Description</h3>
              <hr></hr>
              <div className={styles.formcontainer}>
                <div
                  className={(styles.form, styles.formcontainer_description)}
                >
                  <img
                    src={formattext}
                    alt=""
                    style={{ backgroundColor: "white" }}
                  />
                  <textarea
                    value={prodDesc}
                    className={styles.content_description}
                    onChange={(e) => {
                      setProdDesc(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Jumbotron>
            <div className="container-btn d-flex justify-content-end mb-5">
              <button
                className="btn btn-danger"
                onClick={(e) => handleSubmit(e)}
              >
                Jual
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
