// store.js
import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./ProductSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    wishlist: productSlice.reducer,
    count: productSlice.reducer,
    addtocart: productSlice.reducer,
    uName: productSlice.reducer,
    getitems: productSlice.reducer,
    getmrp: productSlice.reducer,
    // getname: productSlice.reducer,
    // getlocation: productSlice.reducer,
    // getaddress: productSlice.reducer,
    // getstate: productSlice.reducer,
    // getcity: productSlice.reducer,
    // getnumber: productSlice.reducer,
    // getlocality: productSlice.reducer,
    getaddress: productSlice.reducer,
  },
});

export default store;
