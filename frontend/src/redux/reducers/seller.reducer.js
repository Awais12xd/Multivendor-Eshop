import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isSeller : false,
    isloading:false,
    error:null,
    seller:null
}

export const sellerreducer = createSlice({
  name: "seller",
  initialState,
  reducers: {
    loadSellerStart: (state) => {
      state.isloading = true;
    },
    loadSellerSuccess: (state, action) => {
        state.isSeller=true;
      state.seller = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadSellerFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller=null;
    },
  },

})


export const { loadSellerFail, loadSellerStart , loadSellerSuccess } = sellerreducer.actions;

export const sellerReducer = sellerreducer.reducer;
