import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './home';
import Detail from './detail';
import Cart from './cart';
// import Checkout from './checkout';
import NewProduct from './newProduct';
import Category from './category';
import Login from './login';
import SignUp from './signup';
import Reset from './reset';
import Confirm from './confirm';
import Search from './search'


export default function Router() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/detail/:id' exact component={Detail} />
      <Route path='/cart' exact component={Cart} />
      {/* <Route path='/checkout' exact component={Checkout}/> */}
      <Route path='/category/:id' exact component={Category} />
      <Route path='/profile/store/' component={NewProduct} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/reset' component={Reset} />
      <Route path='/confirm' component={Confirm} />
      <Route path='/search' component={Search} />
    </BrowserRouter>
  )
}