import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistreducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const itemExist = state.wishlist.find((i) => i._id === item._id);
      if (itemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) => (i._id === item._id ? item : i)),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },
    removeFromWishlist: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i._id !== action.payload),
      };
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistreducer.actions;

export const wishlistReducer = wishlistreducer.reducer;
