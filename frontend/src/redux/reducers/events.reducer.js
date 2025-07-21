import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isloading:false,
    error:null,
    events:null
}

export const eventsreducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    loadEventsStart: (state) => {
      state.isloading = true;
    },
    loadEventsSuccess: (state, action) => {
      state.events = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadEventsFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.events=null;
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


export const { loadEventsFail, loadEventsStart , loadEventsSuccess , deleteStart , deleteFail , deleteSuccess } = eventsreducer.actions;

export const eventsReducer = eventsreducer.reducer;
