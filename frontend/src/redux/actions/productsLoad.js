import axios from "axios";
import { toast } from "react-toastify";
import { deleteFail, deleteStart, deleteSuccess, loadProductsFail, loadProductsStart, loadProductsSuccess } from "../reducers/products.reducer.js";
import { useSelector } from "react-redux";

const productsLoad = async(dispatch,id) => {

    try {
      dispatch(loadProductsStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-all-products/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadProductsSuccess(res.data.data));
      }).catch(err => {
        dispatch(loadProductsFail(err.response.data))
        console.log("Error while loading the products" , err)
      })
    } catch (error) {
     dispatch(loadProductsFail(error))
     console.log("Error while loading the products" , error)
    }

}
const productDelete = async(dispatch,id) => {

    try {
      dispatch(deleteStart());
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/product/delete-product/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(deleteSuccess(res.data.data));
      }).catch(err => {
        dispatch(deleteFail(err.response.data))
        console.log("Error while deleting the product" , err)
      })
    } catch (error) {
     dispatch(deleteFail(error))
     console.log("Error while deleting the product" , error)
    }

}


export {productsLoad , productDelete }