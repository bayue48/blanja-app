import React, { Component } from "react";
import { logo, filter, cart, mail, bell, avatar } from "../../src/assets";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import {
  Navbar,
  Container,
  InputGroup,
  Image,
  FormControl,
  Nav,
} from "react-bootstrap";

const base_url = process.env.REACT_APP_API;

class navbar extends Component {
  state = {
    product_name: ``,
    current_url: ``,
    color: "",
    size: "",
    category: "",
    fetchSize: [],
    fetchColor: [],
    searchName: "",
  };

  clickFilterHandler = () => {
    this.setState({
      color: "",
      size: "",
      category: "",
    });
  };

  clickOptHandler = (e) => {
    this.setState({
      [e.target.name]: `&${[e.target.name]}=${e.target.id}`,
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //logout
  logoutApp = () => {
    const config = {
      headers: {
        "x-access-token": "Bearer " + this.props.token,
      },
    };
    const data = "";
    console.log("token", this.props.token)
    axios
      .post(base_url + "/auth/logout", data, config)
      .then((res) => {
        this.props.logoutRedux();
      })
      .catch((err) => console.error(err));
  };

  render() {
    console.log(this.state);
    const { isLogin, level } = this.props;
    let loginBtn;
    if (isLogin === true) {
      loginBtn = (
        <>
          <div className="text-decoration-none">
            <Link to="/notification">
              <button className="btn btn-default mr-2">
                <img src={bell} alt="" />
              </button>
            </Link>
            <Link to="/mail">
              <button className="btn btn-default mr-2">
                <img src={mail} alt="" />
              </button>
            </Link>
            {level === 1 ? (
              <Link to="/account/seller">
                {/* <p>Username</p> */}
                <button className="btn btn-default mr-2">
                  <img src={avatar} alt="" />
                </button>
              </Link>
            ) : (
              <Link to="/account/custommer">
                {/* <p>Username</p> */}
                <button className="btn btn-default mr-2">
                  <img src={avatar} alt="" />
                </button>
              </Link>
            )}
            <button className="btn btn-light" onClick={this.logoutApp}>
              <Link
                style={{ color: "grey", textDecoration: "none" }}
                to="/login"
              >
                <i class="fas fa-sign-out-alt"></i>
              </Link>
            </button>
          </div>
        </>
      );
    } else {
      loginBtn = (
        <>
          <div style={{ display: "flex" }}>
            <div className="login">
              <Link
                to={{
                  pathname: "/login",
                  state: this.state,
                }}
              >
                <div className="btn btn-full" type="submit">
                  Login
                </div>
              </Link>
            </div>
            <div className="signup">
              <Link
                to={{
                  pathname: "/signup",
                  state: this.state,
                }}
              >
                <div
                  href="signup"
                  className="btn btn-shadow ml-4"
                  type="submit"
                >
                  Signup
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Navbar
          expand="md lg"
          className="sticky-top navbar-light bg-light shadow rounded p-3 mb-5"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image src={logo} alt="Brand" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <div className="d-flex flex-row justify-content-center">
                <InputGroup>
                  <FormControl
                    className="search-form py-2 border-right-0"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    name="product_name"
                    autoComplete="off"
                    onChange={(e) =>
                      this.setState({ searchName: e.target.value })
                    }
                  />
                  <InputGroup.Append
                    className="input-group-text search-btn bg-white"
                    type="submit"
                  >
                    <Link
                      to={{
                        pathname: "/search",
                        search: "?name=" + this.state.searchName,
                      }}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-search"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "grey", textDecoration: "none" }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                        />
                      </svg>
                    </Link>
                  </InputGroup.Append>
                </InputGroup>
                <div
                  className="btn filter-btn"
                  data-toggle="modal"
                  data-target="#FilterModal"
                >
                  <Image src={filter} alt="Filter" />
                </div>
              </div>
              <Nav className="mr-auto d-flex flex-row justify-content-center align-items-center">
                <div className="cart">
                  <Link
                    to={{
                      pathname: "/cart",
                      state: this.state,
                    }}
                  >
                    <div className="btn cart-btn">
                      <Image src={cart} alt="Cart" />
                    </div>
                  </Link>
                </div>
                <div>{loginBtn}</div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Modal */}
        <div
          className="modal fade"
          id="FilterModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="FilterModalLabel">
                  Filter
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <strong>Colors</strong>
                <br></br>
                <input type="radio" /> Red
                <input type="radio" /> Green
                <input type="radio" /> Blue
                <input type="radio" /> Black
                <div className="dropdown-divider"></div>
                <strong>Sizes</strong>
                <br></br>
                <button className="btn btn-outline-secondary ml-2">XS</button>
                <button className="btn btn-danger ml-2">S</button>
                <button className="btn btn-danger ml-2">M</button>
                <button className="btn btn-outline-secondary ml-2">L</button>
                <button className="btn btn-outline-secondary ml-2">XL</button>
                <div className="dropdown-divider"></div>
                <strong>Category</strong>
                <br></br>
                <button className="btn btn-outline-secondary ml-2">
                  T-shirt
                </button>
                <button className="btn btn-outline-secondary ml-2">
                  Short
                </button>
                <button className="btn btn-outline-secondary ml-2">
                  Jacket
                </button>
                <button className="btn btn-outline-secondary ml-2">
                  Pants
                </button>
                <button className="btn btn-outline-secondary ml-2">
                  Shoes
                </button>
                <div className="dropdown-divider"></div>
                <strong>Brand</strong>
                <select className="text-muted" style={{ border: "none" }}>
                  <option disabled selected hidden>
                    More
                  </option>
                  <option>Zalora Cloth</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                  <option>Hololive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill mr-1"
                  style={{ width: "200px" }}
                  data-dismiss="modal"
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-pill ml-auto ml-1"
                  style={{ width: "200px" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      isLogin: state.auth.isLogin,
      token: state.auth.token,
      id: state.auth.id,
      level: state.auth.level,
      name: state.auth.name,
      email: state.auth.email,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logoutRedux: () => dispatch(logout()),
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));  
