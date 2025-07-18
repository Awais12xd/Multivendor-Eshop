import axios from "axios";
import { toast } from "react-toastify";
import { loadProductsFail, loadProductsStart, loadProductsSuccess } from "../reducers/products.reducer.js";
import { useSelector } from "react-redux";

const productsLoad = async(dispatch,id) => {

    try {
      dispatch(loadProductsStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-all-products/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadProductsSuccess(res.data.data));
        console.log("Products loaded Successfully!" , res)
      }).catch(err => {
        dispatch(loadProductsFail(err.response.data))
        console.log("Error while loading the products" , err)
      })
    } catch (error) {
     dispatch(loadProductsFail(error))
     console.log("Error while loading the products" , error)
    }

}

export {productsLoad}