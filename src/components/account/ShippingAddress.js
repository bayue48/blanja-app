import React, { useState, useEffect } from "react";
import styles from "./another.module.css";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../account/sidebar";
import { Jumbotron } from "react-bootstrap";
import ModalChooseAddress from "../Modal/ModalAddAddress";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = process.env.REACT_APP_API;

toast.configure();
export default function ShippingAddress() {
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState([]);
  const [addP, setAddP] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.id);

  useEffect(() => {
    window.addEventListener("mousemove", () => {
      getAddressUser(changeAddress);
    });
    const unsubscribe = window.removeEventListener("mousemove", () => {
      getAddressUser(changeAddress);
    });
    return unsubscribe;
  }, []);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address/${uid}`, {
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

  const handleDelete = (id) => {
    // id.preventDefault();
    axios
      .delete(API + `/address/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Delete Adress Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setAddP(true);
        console.log("berhasil delete", res);
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  if (addP === true) {
    return <Redirect to="/account" />;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling">
          <Jumbotron
            className="container-content"
            style={{ height: "90%", backgroundColor: "white" }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h6 className={styles.title}>Choose another address</h6>
              <p className={styles.subtitle}>Manage your shipping address</p>
            </div>

            {/* FormContainer */}
            <div className={styles.addresscontainer}>
              <div className={styles.addnewaddress}>
                <h5
                  className={styles.addtext}
                  onClick={() => setShowChooseAddress(true)}
                >
                  Add new address
                </h5>
              </div>
              {changeAddress &&
                changeAddress.map(
                  ({ id, name, address_name, street, city, zip, phone }) => {
                    console.log("id adresds", id);
                    return (
                      <div className={styles.listaddress} id={id} key={id}>
                        <div
                          className={styles.delete}
                          data-toggle="modal"
                          data-backdrop="false"
                          data-target=".remove-address"
                        >
                          {/* <p style={{ color: "red" }}>Delete</p> */}
                        </div>
                        <h5 className={styles.listtitle}>{address_name}</h5>
                        <p className={styles.detailaddres}>
                          {`${name}, Jalan ${street}, Kota. ${city}, Kode Pos: ${zip}, Nomor HP: ${phone}`}
                        </p>
                        <h5 className={styles.changeaddress}>Change address</h5>
                      </div>
                    );
                  }
                )}
            </div>
            {/* </div> */}
          </Jumbotron>
        </div>
      </div>
      {/* delete */}
      <div
        class="modal fade remove-address"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you sure want to delete?</h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalChooseAddress
        show={showChooseAddress}
        onHide={() => setShowChooseAddress(false)}
      />
    </>
  );
}
