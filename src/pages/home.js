import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Navbar from '../components/navbar';
import Carousel from '../components/carousel';
import Category from '../components/category';
import New from '../components/new';
import Popular from '../components/popular';

export default class home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Carousel />
        <Category />
        <New />
        <Popular />
      </>
    )
  }
}