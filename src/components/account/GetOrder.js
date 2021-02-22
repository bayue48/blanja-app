import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import Sidebar from "../account/sidebar";
import axios from "axios";
import NotFound from "../../assets/noOrders.png";
import css from "./Order.module.css";

const GetOrder = () => {
  const [order, setOrder] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

  const getOrder = () => {
    axios
      .get(`${process.env.REACT_APP_API}/history/${userId}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const order = data.data;
        console.log("ini order", order);
        setOrder(order);
      })
      .catch((err) => {
        console.log("ini error", err.response);
      });
  };

  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling" style={{ height: "100%" }}>
          <Jumbotron
            className="container-content"
            style={{
              padding: "20px",
              height: "100%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <h3>My Order</h3>
            <hr></hr>
            {order.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center mt-10">
                <img src={NotFound} style={{ height: "15rem" }} />
              </div>
            ) : (
              <div className="container">
                <div className="d-flex flex-column">
                  {order
                    ? order &&
                      order.map((order) => (
                        <div className={css.CardWrapper} key={order.id}>
                          <div className={css.OrderHead}>
                            <h5>Order {order.invoice_id.slice(4)}</h5>
                            <p>{order.updated}</p>
                          </div>
                          <p>Tracking number: {order.invoice_id}</p>
                          <p>Quantity: {order.qty}</p>
                          <p>Payment method: {order.payment}</p>
                          <div className={css.OrderFooter}>
                            <p>Total Price: Rp. {toPrice(order.price)}</p>
                            <p>{order.status_name}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            )}
          </Jumbotron>
        </div>
      </div>
    </>
  );
};

export default GetOrder;
