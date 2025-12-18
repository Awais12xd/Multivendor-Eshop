import axios from "axios";
import { loadOrdersFail, loadOrdersStart, loadOrdersSuccess, loadSellerOrdersFail, loadSellerOrdersStart, loadSellerOrdersSuccess } from "../reducers/order.reducer.js";
import { useSelector } from "react-redux";


const allOrdersLoad = async(dispatch,id) => {

    try {
      dispatch(loadOrdersStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-all-users-order/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadOrdersSuccess(res.data.data));
      }).catch(err => {
        dispatch(loadOrdersFail(err.response.data))
        console.log("Error while loading the user orders" , err)
      })
    } catch (error) {
     dispatch(loadOrdersFail(error))
     console.log("Error while loading the user orders" , error)
    }

}
const allSellerOrdersLoad = async(dispatch,id) => {

    try {
      dispatch(loadSellerOrdersStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-all-sellers-order/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadSellerOrdersSuccess(res.data.data));
        console.log("All orders of the seller loaded Successfully!" , res)
      }).catch(err => {
        dispatch(loadSellerOrdersFail(err.response.data))
        console.log("Error while loading the seller orders" , err)
      })
    } catch (error) {
     dispatch(loadSellerOrdersFail(error))
     console.log("Error while loading the seller orders" , error)
    }

}

export {allOrdersLoad , allSellerOrdersLoad}

