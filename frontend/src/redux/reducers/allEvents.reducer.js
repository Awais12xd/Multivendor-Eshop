import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: null,
  allEvents: null,
};

export const alleventsreducer = createSlice({
  name: "allEvents",
  initialState,
  reducers: {
    loadAllEventsStart: (state) => {
      state.isloading = true;
    },
    loadAllEventsSuccess: (state, action) => {
      state.allEvents = action.payload;
      state.isloading = false;
      state.error = null;
    },
    loadAllEventsFail: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.allEvents = null;
    },
  },
});

export const {loadAllEventsFail , loadAllEventsSuccess , loadAllEventsStart } = alleventsreducer.actions;

export const allEventsReducer = alleventsreducer.reducer;