import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  account,
  address,
  bag,
  pen,
  home,
  order,
  product,
  user,
} from "../../assets/";
import "./sidebar.css";

const Sidebar = (props) => {
  const history = useHistory();

  return (
    <div className="container-sidebar">
      <div className="content-sidebar">
        <div className="d-flex justify-content-center">
          <div className="dp-profil">
            <img className="img-profil" src={user} alt="" />
          </div>
          <div className="ml-4">
            <p>{localStorage.getItem("username")}</p>
            <div className="d-flex margin-up">
              <div className="mr-1">
                <Link>
                  <img height="16px" width="16px" src={pen} alt="" />
                </Link>
              </div>
              <p>Ubah Profile</p>
            </div>
          </div>
        </div>
        {props.auth.level === 1 ? (
          <div className="mt-5 ml-5 btnside">
            <div className="d-flex justify-content-between">
              <div className="icon" style={{ backgroundColor: "#456BF3" }}>
                <img alt="" src={home} />
              </div>
              <Dropdown className="d-flex">
                <p className="mr-2">Store</p>
                <Dropdown.Toggle
                  split
                  variant="light"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Store Profile</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="icon" style={{ backgroundColor: "#F36F45" }}>
                <img alt="" src={product} />
              </div>
              <Dropdown className="d-flex">
                <p className="mr-2">Product</p>
                <Dropdown.Toggle
                  split
                  variant="light"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => history.push("/profile/myproduct")}
                  >
                    My Product
                  </Dropdown.Item>
                  <Dropdown.Item href="/profile/myproduct">
                    Sellng Products
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="icon" style={{ backgroundColor: "#F3456F" }}>
                <img alt="" src={bag} />
              </div>
              <Dropdown className="d-flex">
                <p className="mr-2">Order</p>
                <Dropdown.Toggle
                  split
                  variant="light"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">My Order</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Order Cancel </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="mt-5 ml-5 btnside">
            <div className="d-flex justify-content-between">
              <div className="icon" style={{ backgroundColor: "#456BF3" }}>
                <img alt="" src={account} />
              </div>
              <Dropdown className="d-flex">
                <Link>
                  <p className="mr-2 text-dark">My Account</p>
                </Link>
              </Dropdown>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="icon" style={{ backgroundColor: "#F36F45" }}>
                <img alt="" src={address} />
              </div>
              <Dropdown className="d-flex">
                <Link>
                  <p className="mr-2 text-dark">Shipping Address</p>
                </Link>
              </Dropdown>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="icon" style={{ backgroundColor: "#F3456F" }}>
                <img alt="" src={order} />
              </div>
              <Dropdown className="d-flex">
                <Link>
                  <p className="mr-2 text-dark">My Order</p>
                </Link>
              </Dropdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
export default connect(mapStateToProps)(Sidebar);
