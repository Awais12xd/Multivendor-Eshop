import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  loading: false,
  error: null,
  user: null,
};

export const userreducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Load User
    loadUserStart: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.user = null;
    },
    //Update the user data
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //update user address
    updateUserAddressStart: (state) => {
    },
    updateUserAddressSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     //delete user address
    deleteUserAddressStart: (state) => {
    },
    deleteUserAddressSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteUserAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadUserStart,
  loadUserSuccess,
  loadUserFail,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
  updateUserAddressStart,
  updateUserAddressSuccess,
  updateUserAddressFail,
  deleteUserAddressStart,
  deleteUserAddressSuccess,
  deleteUserAddressFail,
} = userreducer.actions;

export const userReducer = userreducer.reducer;
