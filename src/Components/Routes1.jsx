import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./Home";
import Product from "./Product";
import HomePage from "./Home";
import ContactUs from "./ContactUs";
import ViewProducts from "./ViewProducts";
import Error404 from "./Error404";
import Cart from "./Cart";
import WishList from "./WishList";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Address from "./Address";
import Payment from "./Payment";

const Routes1 = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default Routes1;
