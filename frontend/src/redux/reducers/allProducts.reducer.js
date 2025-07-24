import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: null,
  allProducts: null,
};

export const allproductsreducer = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    loadAllProductsStart: (state) => {
      state.isloading = true;
    },
    loadAllProductsSuccess: (state, action) => {
      state.allProducts = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadAllProductsFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.allProducts = null;
    },
  },
});

export const {loadAllProductsFail , loadAllProductsSuccess , loadAllProductsStart } = allproductsreducer.actions;

export const allProductsreducer = allproductsreducer.reducer;