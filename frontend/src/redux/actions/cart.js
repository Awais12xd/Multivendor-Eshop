import { addToCart, removeFromCart } from "../reducers/cart.reducer.js"

const addToCartAction = (data) => async(dispatch , getState) => {
     
     dispatch(addToCart(data));
     localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cart));
     return data;
}

const removeFromCartAction = (data) => async(dispatch , getState) => {
    dispatch(removeFromCart(data._id));
    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cart));
    return data;
}

export {
    addToCartAction,
    removeFromCartAction,
}