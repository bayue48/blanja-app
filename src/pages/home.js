import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Carousel from '../components/home/carousel';
import Categories from '../components/home/categories';
import New from '../components/home/new';
import Popular from '../components/home/popular';

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