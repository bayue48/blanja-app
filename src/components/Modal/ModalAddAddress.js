import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import styles from "./modal.module.css";
import axios from "axios";

const API = process.env.REACT_APP_API;

export default function ModalAddAddress(props) {
  const [myaddress, setAddress] = useState({
    name: "",
    address_name: "",
    city: "",
    street: "",
    zip: "",
    user_id: ""
  });

  // const history = useHistory();
  const user_id = useSelector((state) => state.auth.id);
  let token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address_name, city, street, zip, phone } = myaddress;
    let body = {
      name: name,
      address_name: address_name,
      street: street,
      city: city,
      zip: zip,
      phone: phone,
      user_id: user_id,
    };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("address", address_name);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("zip_code", zip);
    formData.append("phone", phone);

    await axios
      .post(`${API}/address`, body, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          props.onHide();
        } else if (res.data.status === 500) {
          props.onHide();
        }
        console.log("success", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.container}>
        <h4 className={styles.title}>Add new address</h4>
        <div className={styles.content}>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="address">
                Save address as (ex : home address, office address)
              </label>
              <input
                id="address"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, address_name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="recipients">
                Recipient’s name
              </label>
              <input
                id="recipients"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, name: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for="tlp">
              Recipient's telephone number
              </label>
              <input
                id="tlp"
                type="number"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, phone: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="address">
                Address
              </label>
              <input
                id="address"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, street: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for="postal">
                Postal code
              </label>
              <input
                id="postal"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, zip: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="city">
                City or subdistrict
              </label>
              <input
                id="city"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, city: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}></div>
          </div>

          <div className={styles.iteminput}>
            <input
              className={styles.itemcheckbox}
              type="checkbox"
              id="primary"
              value="1"
              onChange={(e) => {
                setAddress({ ...myaddress, primary: e.target.value });
              }}
            />
            <label className={styles.label} for="primary">
              Make it primary addres
            </label>
          </div>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}></div>
            <div className={styles.space}></div>
            <div className={styles.contentbtn}>
              <button onClick={props.onHide} className={styles.btncancel}>
                Cancel
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className={styles.btnsave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
