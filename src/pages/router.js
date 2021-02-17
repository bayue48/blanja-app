import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./protect";

import Home from "./home";
import Detail from "./detail";
import Cart from "./trx/bag";
import Checkout from "./trx/checkout";
import Category from "./category";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Reset from "./auth/reset";
import Confirm from "./auth/confirm";
import Search from "./search";
import List from "./account/listProduct";
import Profile from "./account/profile";
import NotFound from "./404";
import AddProduct from "../components/account/AddProduct";
import EditProduct from "../components/account/EditProduct";

export default function Router() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/category/:id" exact component={Category} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/reset" component={Reset} />
            <Route path="/confirm" component={Confirm} />
            {/* <Route path='/otp' component={OneTimePass} /> */}
            {/* <Route path='/list' component={List} /> */}
            {/* <Route path='/delete/:id' component={Delete} /> */}
            {/* <Route path='/update/:id' component={Update} /> */}
            <ProtectedRoute path="/checkout" exact component={Checkout} />
            <ProtectedRoute path="/account" component={Profile} />
            <ProtectedRoute path="/product" exact component={List} />
            <ProtectedRoute path="/add" exact component={AddProduct} />
            <ProtectedRoute path="/edit/:id" component={EditProduct} />
            {/* <ProtectedRoute path="/account/update" component={Update} /> */}
            {/* <ProtectedRoute path="/account/order" component={GetOrder} /> */}
            {/* <ProtectedRoute path="/account/password/change" component={ChangePassword} /> */}
            {/* <ProtectedRoute path="/account/address" component={ShippingAddress} /> */}
            <Route path='*' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
