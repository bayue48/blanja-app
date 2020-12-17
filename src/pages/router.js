import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../redux/store";

import Home from './home';
import Detail from './detail';
import Cart from './cart';
import Checkout from './checkout';
import New from './newProduct';
import Category from './category';
import Login from './login';
import SignUp from './signup';
import Reset from './reset';
import Confirm from './confirm';
import Search from './search'
import List from './listProduct'
import Update from './updateProduct'


export default function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' exact component={Home} />
        <Route path='/detail/:id' exact component={Detail} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/checkout' exact component={Checkout} />
        <Route path='/category/:id' exact component={Category} />
        <Route path='/new/' component={New} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/reset' component={Reset} />
        <Route path='/confirm' component={Confirm} />
        <Route path='/search' component={Search} />
        <Route path='/list' component={List} />
        {/* <Route path='/delete/:id' component={Delete} /> */}
        <Route path='/update/:id' component={Update} />
      </BrowserRouter>
    </Provider>
  )
}