import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuth : false,
    loading:false,
    error:null,
    user:null
}

export const userreducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserStart: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.isAuth=true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.user=null;
    },
  },

})


export const { loadUserStart, loadUserSuccess , loadUserFail } = userreducer.actions;

export const userReducer = userreducer.reducer;
