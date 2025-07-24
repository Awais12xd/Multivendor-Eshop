import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isloading:false,
    error:null,
    products:null,
    allProducts : null
}

export const productsreducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProductsStart: (state) => {
      state.isloading = true;
    },
    loadProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadProductsFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.products=null;
    },
    //Delete Product
    deleteStart: (state) => {
      state.isloading = true;
    },
    deleteSuccess: (state, action) => {
      state.isloading = false;
      state.error = null;
    },
    deleteFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    
  },

})


export const { loadProductsFail, loadProductsStart , loadProductsSuccess , deleteStart , deleteFail , deleteSuccess } = productsreducer.actions;

export const productsReducer = productsreducer.reducer;
