import React, { useState, useEffect } from "react";
import { Modal} from "react-bootstrap";
import { useSelector } from "react-redux";
import colors from "../../utility/colors.module.css";
import text from "../../utility/text.module.css";
import classname from "../../utility/classJoiner";
import "./ModalChooseAddress.css";
import axios from "axios";

const API = process.env.REACT_APP_API;

const ModalChooseAddress = (props) => {
  const [address, setAddress] = useState([]);
  // const [idAddress, setIdAddress] = useState([]);

  const id = useSelector((state) => state.auth.id);
  let token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.addEventListener("mousemove", () => {
      getAddressUser(address);
    });
    const unsubscribe = window.removeEventListener("mousemove", () => {
      getAddressUser(address);
    });
    return unsubscribe;
  }, []);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = window.addEventListener("focus", () => {
  //     getAddressUser(address);
  //   });
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   getAddressUser(address);
  // }, [])

  // useEffect(() => {
  //   getAddressUser();
  // }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="no-border" />
      <Modal.Body className="no-border">
        <div className="container-modal">
          <div>
            <h4 className="text-top">Choose another address</h4>
          </div>
          <div
            className="add-address"
            onClick={props.showAddAddress}
            closeButton
          >
            <h4 className={classname(colors.grayText, "text-add-addres")}>
              Add new address
            </h4>
          </div>
          {address &&
            address.map(
              ({
                id,
                name,
                address_name,
                street,
                city,
                zip,
                phone,
              }) => {
                console.log("id adresds", id)
                return (
                  <div className="container-address-list" style={{marginBottom: "10px"}} id={id} key={id}>
                    <p className={classname(text.text, "text-title")}>
                      {address_name}
                    </p>
                    <p className="text-addres mb-4" >{`${name}, Jalan ${street}, Kota. ${city}, Kode Pos: ${zip}, Nomor HP: ${phone}`}</p>
                    {/* <Link to={{
                      pathname: `/checkout/${id_address}`,
                      changeAddress
                    }}> */}
                    <button
                      className="btn btn-danger"
                    >
                      Change address
                    </button>
                    {/* </Link> */}
                  </div>
                );
              }
            )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChooseAddress;
