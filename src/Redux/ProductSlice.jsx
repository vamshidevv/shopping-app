import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch {}
};

const initialState = loadState() || {
  data: [],
  loading: true,
  currentColor: "#72c0e5",
  selectedProduct: null,
  wislistproduct: [],
  val: 0,
  cart: [],
  userName: "",
  totalItems: "",
  totalMrp: "",
  // addressname: "",
  // addressLocation: "",
  // fulladdress: "",
  // city: "",
  // state: "",
  // mobileno: "",
  // locality: "",
  address: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addToWishList: (state, action) => {
      state.wislistproduct.push(action.payload);
      saveState(state);
    },
    removeFromWishlist: (state, action) => {
      state.wislistproduct = state.wislistproduct.filter(
        (item) => item.id !== action.payload
      );
      saveState(state);
    },
    addtocart: (state, action) => {
      const { product, size } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      } else {
        const productWithSize = { ...product, size, quantity: 1 };
        state.cart.push(productWithSize);
      }
      state.val = state.cart.length;
      saveState(state);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.val = state.cart.length;
      saveState(state);
    },

    storeUserName: (state, action) => {
      state.userName = action.payload;
      saveState(state);
    },
    removeUserName: (state, action) => {
      state.userName = "";
      saveState(state);
    },
    getTotalItems: (state, action) => {
      state.totalItems = action.payload;
      saveState(state);
    },
    getTotalMrp: (state, action) => {
      state.totalMrp = action.payload;
      saveState(state);
    },
    // getAddressName: (state, action) => {
    //   state.addressname = action.payload;
    // },
    // getAddresslocation: (state, action) => {
    //   state.addressLocation = action.payload;
    // },
    // getFullAddress: (state, action) => {
    //   state.fulladdress = action.payload;
    // },
    // getState: (state, action) => {
    //   state.city = action.payload;
    // },
    // getCity: (state, action) => {
    //   state.state = action.payload;
    // },
    // getMobileNumber: (state, action) => {
    //   state.mobileno = action.payload;
    // },
    // getAddressLocality: (state, action) => {
    //   state.locality = action.payload;
    // },

    getAddressDetails: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  fetchProductsSuccess,
  setCurrentColor,
  setSelectedProduct,
  addToWishList,
  removeFromWishlist,
  addtocart,
  removeFromCart,
  storeUserName,
  removeUserName,
  getTotalItems,
  getTotalMrp,
  getAddressName,
  getAddresslocation,
  getFullAddress,
  getState,
  getCity,
  getMobileNumber,
  getAddressLocality,
  getAddressDetails,
} = productSlice.actions;

export default productSlice; // Exporting the reducer as default
