import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/account/sidebar";
import { useSelector } from "react-redux";

const API = process.env.REACT_APP_API;

const List = () => {
  const id = useSelector((state) => state.auth.id);

  const [dta, setDta] = useState([]);

  const getAllProduct = () => {
    axios
      .get(API + `/products/user/${id}`)
      .then(({ data }) => {
        const dta = data.data;
        setDta(dta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  console.log("datda", dta);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <div
          className="card-body"
          style={{ marginLeft: "3%", marginRight: "3%" }}
        >
          <h2>Product List</h2>
          <div className="dropdown-divider"></div>
          <table id="dt1" className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {dta &&
                dta.map(
                  ({
                    product_name,
                    product_brand,
                    product_desc,
                    product_price,
                    product_qty,
                  }) => {
                    return (
                      <>
                        <tr>
                          <td>{product_name}</td>
                          <td>{product_desc}</td>
                          <td>{product_brand}</td>
                          <td>{product_price}</td>
                          <td>{product_qty}</td>
                        </tr>
                      </>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
