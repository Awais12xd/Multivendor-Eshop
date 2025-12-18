import axios from "axios";
import { loadAllProductsFail, loadAllProductsStart, loadAllProductsSuccess } from "../reducers/allProducts.reducer.js";


const allProductsLoad = async(dispatch,id) => {

    try {
      dispatch(loadAllProductsStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-every-product` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadAllProductsSuccess(res.data.data));
      }).catch(err => {
        dispatch(loadAllProductsFail(err.response.data))
        console.log("Error while loading the all products" , err)
      })
    } catch (error) {
     dispatch(loadAllProductsFail(error))
     console.log("Error while loading the all products" , error)
    }

}

export {allProductsLoad}

