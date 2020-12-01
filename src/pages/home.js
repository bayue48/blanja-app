import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Carousel from '../components/carousel';
import Categories from '../components/categories';
import New from '../components/new';
import Popular from '../components/popular';

export default class home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Carousel />
        <Categories />
        <New />
        <Popular />
      </>
    )
  }
}