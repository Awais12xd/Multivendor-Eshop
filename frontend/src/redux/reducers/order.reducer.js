import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: null,
  orders: null,
};

export const ordersreducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //for user
    loadOrdersStart: (state) => {
      state.isloading = true;
    },
    loadOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadOrdersFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.orders = null;
    },
    //for seller
    loadSellerOrdersStart: (state) => {
      state.isloading = true;
    },
    loadSellerOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadSellerOrdersFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.orders = null;
    },
  },
});

export const {
  loadOrdersFail,
  loadOrdersStart,
  loadOrdersSuccess,
  loadSellerOrdersFail,
  loadSellerOrdersStart,
  loadSellerOrdersSuccess,
} = ordersreducer.actions;

export const ordersReducer = ordersreducer.reducer;
