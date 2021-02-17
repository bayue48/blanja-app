import React, { Component } from "react";
import Navbar from "../../components/navbar";
// import Sidebar from "../../components/account/sidebar";
import List from "../../components/account/list";
import { Container } from "react-bootstrap";

export default class listProduct extends Component {
  render() {
    return (
      <>
        <Navbar />
        <List />
      </>
    );
  }
}
