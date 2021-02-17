import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../components/account/sidebar";

export default class list extends Component {
  state = {
    dataupdate: [],
  };

  getAllProduct = () => {
    axios
      .get(`http://localhost:8000/products`)
      .then(({ data }) => {
        this.setState({
          dataupdate: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getAllProduct();
  };

  render() {
    const { dataupdate } = this.state;
    console.log("datda", dataupdate)
    return (
        <div style={{ display: "flex" }}>
        <Sidebar />
        <div>
            <div className="card-body" style={{marginLeft: "3%", marginRight: "3%"}}>
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
                  {dataupdate &&
                    dataupdate.map(
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
  }
}
