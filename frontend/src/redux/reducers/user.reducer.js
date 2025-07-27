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
    //Update the user
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
  },
});

export const {
  loadUserStart,
  loadUserSuccess,
  loadUserFail,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} = userreducer.actions;

export const userReducer = userreducer.reducer;
