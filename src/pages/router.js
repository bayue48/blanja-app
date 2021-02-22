import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./protect";
import PrivateRoute from "./private";

import Home from "./home";
import Detail from "./detail";
import Cart from "./trx/bag";
import Checkout from "./trx/checkout";
import Category from "./category";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Reset from "./auth/reset";
import Forgot from "./auth/forgot";
import OneTimePass from "./auth/otp";
import Search from "./search";
import List from "./account/listProduct";
import Profile from "./account/profile";
import NotFound from "./404";
import AddProduct from "../components/account/AddProduct";
import EditProduct from "../components/account/EditProduct";
import ChangePassword from "../components/account/ChangePassword";
import ShippingAddress from "../components/account/ShippingAddress";
import Order from "../components/account/GetOrder";
import Chat from "./chat";

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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/reset" component={Reset} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/validation" component={OneTimePass} />
            <PrivateRoute path="/cart" exact component={Cart} />
            <PrivateRoute path="/checkout" exact component={Checkout} />
            <ProtectedRoute path="/account" component={Profile} />
            <ProtectedRoute path="/product" exact component={List} />
            <ProtectedRoute path="/add" exact component={AddProduct} />
            <ProtectedRoute path="/edit/:id" component={EditProduct} />
            <ProtectedRoute path="/order" component={Order} />
            <ProtectedRoute path="/change" component={ChangePassword} />
            <ProtectedRoute path="/address" component={ShippingAddress} />
            <ProtectedRoute path="/chat" component={Chat} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
