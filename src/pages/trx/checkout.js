import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar";
import ModalChooseAddress from "../../components/Modal/ModalChooseAddress";
// import ModalSelectPayment from "../../components/Modal/ModalSelectPayment";
import ModalAddAddress from "../../components/Modal/ModalAddAddress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./checkout.css";
import colors from "../../utility/colors.module.css";
import text from "../../utility/text.module.css";
import classname from "../../utility/classJoiner";
import "./modal.css";
import { clearCart, clearCheckout } from "../../redux/actions/cart";

import gopay from "../../assets/gopay.png";
import pos from "../../assets/pos.png";
import mastercard from "../../assets/master.png";

const API = process.env.REACT_APP_API;
toast.configure();

const Checkout = ({ location, cart, history, props }) => {
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [payment, setPayment] = useState("");
  // const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState([]);
  // const [getFirstAddress, setGetFirstAddress] = useState([]);
  // const item = useSelector((state) => state.cart);
  const ongkir = 15000;

  const dispatch = useDispatch();
  const { data } = location;
  const uid = useSelector((state) => state.auth.id);
  let token = useSelector((state) => state.auth.token);

  // const {
  //   id,
  //   name,
  //   address_name,
  //   street,
  //   city,
  //   zip,
  //   phone,
  // } = props.location;
  // console.log("toket", id);
  console.log("toket", token);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address/${uid}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const addressNull = res.data.data;
        const addressData = res.data.data[0];

        if (address === null) {
          setAddress(addressNull);
        } else {
          setAddress(addressData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddressUser();
  }, []);

  useEffect(() => {
    const unsubscribe = window.addEventListener("focus", () => {
      getAddressUser();
    });
    return unsubscribe;
  }, [window]);

  console.log("address", address);

  const postTransaction = () => {
    const info = {
      user_id: uid,
      qty: data !== undefined ? data[1] : null,
      price: data !== undefined ? data[0] : null,
      payment: payment,
      // addreess_id: id,
      o_status: 1,
    };
    axios
      .post(`${API}/history/`, info)
      .then((res) => {
        console.log("Checkout info,", res);
      })
      .catch((err) => console.log(err));
    dispatch(clearCart());
    dispatch(clearCheckout());
    toast.success("Checkout Success", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const submit = () => {
    postTransaction();
    history.push("/cart");
  };

  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ marginTop: "20px" }}>Checkout</h1>
        <div className="Wrapper">
          <div className="row">
            <p className="ttl-addrs">Shipping Address</p>
            {address.name !== undefined ? (
              <>
                <div className="col-11 address">
                  <p>{address.name}</p>
                  <p>
                    {`${address.address_name}, Jalan ${address.street}, Kota ${address.city}, Kodepos: ${address.zip}`}
                  </p>
                  <button
                    className="btn-choose-address"
                    onClick={() => setShowChooseAddress(true)}
                    style={{ display: "flex" }}
                  >
                    <p className="addres-btn">Choose another address</p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="col-12 address"
                  // style={{ justifyContent: "center" }}
                >
                  <button
                    className="btn-choose-address"
                    onClick={() => setShowAddAddress(true)}
                    style={{
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <p
                      className="addres-btn"
                      style={{ color: "black", height: "10px" }}
                    >
                      Add new Address
                    </p>
                  </button>
                </div>
              </>
            )}
            <div className="BagWrapper">
              {cart.map((item) => {
                return (
                  <div className="CheckoutWrapper">
                    <div className="ProductInfo">
                      <img
                        className="ProductImg"
                        src={item.image}
                        alt="sample"
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#9B9B9B",
                          }}
                        >
                          {item.brand}
                        </p>
                      </div>
                    </div>
                    <div className="TotalPrice">
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#222222",
                        }}
                      >
                        Rp {toPrice(item.price)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="SummaryCard">
            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              Shopping Summary
            </p>
            <div className="TotalPrice">
              <p>Order</p>
              <p>Rp. {data !== undefined ? toPrice(data[0]) : null}</p>
            </div>
            <button
              data-toggle="modal"
              data-backdrop="false"
              data-target=".checkout-modal"
              type="button"
              className="btn btn-danger BuyBtn"
              data-toggle="modal"
              data-target="#paymentModal"
            >
              Select Payment
            </button>
          </div>
        </div>
      </div>

      <ModalChooseAddress
        show={showChooseAddress}
        onHide={() => setShowChooseAddress(false)}
        showAddAddress={() => setShowAddAddress(true)}
      />
      {/* <ModalSelectPayment
        show={showPayment}
        onHide={() => setShowPayment(false)}
        showAddAddress={() => setShowAddAddress(true)}
        cart={cart.filter((item) => item.selected === true)}
        onSubmit={() => submit()}
        // handleSelectPayment={(evt) => handleSelectPayment(evt)}
      /> */}
      <ModalAddAddress
        show={showAddAddress}
        onHide={() => setShowAddAddress(false)}
      />

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="paymentModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-top" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body no-border modal-body-container">
              <div className="container-modal">
                <div className="row container-item-payment">
                  <h4
                    className={classname(colors.blackText, "text-title-head")}
                  >
                    Payment Method
                  </h4>
                </div>
                <div className="row align-items-center container-item-payment">
                  <img src={gopay} alt="" />
                  <h4 className="text-item-payment">Gopay</h4>
                  <input
                    type="radio"
                    name="payment"
                    id="gopay"
                    value="gopay"
                    //   onChange={props.handleSelectPayment}
                    className="ml-auto"
                    onClick={() => setPayment("Gopay")}
                  />
                </div>
                <div className="row align-items-center container-item-payment">
                  <img src={pos} alt="" />
                  <h4 className="text-item-payment">Pos Indonesia</h4>
                  <input
                    type="radio"
                    name="payment"
                    id="pos"
                    value="pos"
                    //   onChange={props.handleSelectPayment}
                    className="ml-auto"
                    onClick={() => setPayment("POS")}
                  />
                </div>
                <div className="row align-items-center container-item-payment">
                  <img src={mastercard} alt="" />
                  <h4 className="text-item-payment">Mastercard</h4>
                  <input
                    type="radio"
                    name="payment"
                    id="mastercard"
                    //   onChange={props.handleSelectPayment}
                    value="mastercard"
                    className="ml-auto"
                    onClick={() => setPayment("Mastercard")}
                  />
                </div>
              </div>
            </div>
            <div class="modal-body no-border">
              <div className="container-modal">
                <div className="row container-item-payment">
                  <h4
                    className={classname(colors.blackText, "text-title-head")}
                  >
                    Shopping summary
                  </h4>
                </div>
                <div className="row align-items-center container-item-summary">
                  <h4 className={classname(colors.grayText, text.text)}>
                    Order
                  </h4>
                  <h3 className="ml-auto text-price">
                    Rp. {data !== undefined ? toPrice(data[0] + ongkir) : null}
                  </h3>
                </div>
                <div className="row align-items-center container-item-summary">
                  <h4 className={classname(colors.grayText, text.text)}>
                    Delivery
                  </h4>
                  <h3 className="ml-auto text-price">Rp {ongkir}</h3>
                </div>
              </div>
            </div>
            <div class="modal-body shadow-lg">
              <div className="container-modal-footer">
                <div className="row">
                  <div className="col">
                    <h4
                      className={classname(colors.blackText, "text-title-head")}
                    >
                      Shopping summary
                    </h4>
                    <h3 className={classname(colors.primaryText, "text-price")}>
                      Rp.{" "}
                      {data !== undefined ? toPrice(data[0] + ongkir) : null}
                    </h3>
                  </div>
                  <div className="col-5 align-self-center">
                    <button className="btn btn-danger btn-bu" onClick={submit}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="modal-footer ">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default withRouter(connect(mapStateToProps)(Checkout));
