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
  const [changeAddress, setChangeAddress] = useState([]);
  // const [idAddress, setIdAddress] = useState([]);

  const id = useSelector((state) => state.auth.id);
  let token = useSelector((state) => state.auth.token);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setChangeAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddressUser();
  }, []);

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
          {changeAddress &&
            changeAddress.map(
              ({
                id_address,
                name,
                address_name,
                street,
                city,
                zip,
                phone,
              }) => {
                return (
                  <div className="container-address-list" style={{marginBottom: "10px"}} key={id_address}>
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
