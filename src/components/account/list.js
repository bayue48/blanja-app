import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/account/sidebar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Redirect, Link } from "react-router-dom";

const API = process.env.REACT_APP_API;

const List = (props) => {
  const [addP, setAddP] = useState(false);
  console.log("props product", props);
  const uid = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);

  const [dta, setDta] = useState([]);

  const getAllProduct = () => {
    axios
      .get(API + `/products/user/${uid}`)
      .then(({ data }) => {
        const dta = data.data;
        setDta(dta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    // id.preventDefault();
    axios
      .delete(API + `/products/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Delete Product Success", {
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

  useEffect(() => {
    getAllProduct();
  }, []);

  if (addP === true) {
    return <Redirect to="/account" />;
  }

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
          {dta.length === 0 ? (
            <p>You dont have any product</p>
          ) : (
            <table id="dt1" className="table table-bordered table-hover">
              <thead className="table-info">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dta &&
                  dta.map(
                    ({
                      id,
                      product_name,
                      product_brand,
                      product_desc,
                      product_price,
                      product_qty,
                      product_category,
                      product_img,
                      product_size,
                      product_color,
                      product_condition,
                      product_rating,
                      user_id,
                    }) => {
                      return (
                        <>
                          <tr key={id}>
                            <Link
                              to={{
                                pathname: `/detail/${id}`,
                                dta,
                              }}
                            >
                              <td class="text-decoration-none">
                                {product_name}
                              </td>
                            </Link>
                            <td>{product_desc}</td>
                            <td>{product_brand}</td>
                            <td>{product_price}</td>
                            <td>{product_qty}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: `/edit/${id}`,
                                  id,
                                  product_name,
                                  product_brand,
                                  product_desc,
                                  product_category,
                                  product_price,
                                  product_qty,
                                  product_img,
                                  product_size,
                                  product_color,
                                  product_condition,
                                  product_rating,
                                  user_id,
                                }}
                              >
                                <button className="btn btn-primary">
                                  Edit
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                data-toggle="modal"
                                data-target=".modal-delete"
                                data-backdrop="false"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* delete */}
      <div
        class="modal fade modal-delete"
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
    </div>
  );
};

export default List;
