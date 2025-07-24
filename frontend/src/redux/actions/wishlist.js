import {
  addToWishlist,
  removeFromWishlist,
} from "../reducers/wishlist.reducer";

const addToWishlistAction = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

const removeFromWishlistAction = (data) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(data._id));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

export { addToWishlistAction, removeFromWishlistAction };
