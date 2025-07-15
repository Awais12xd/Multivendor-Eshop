import axios from "axios";
import { loadSellerFail , loadSellerStart , loadSellerSuccess } from "../reducers/seller.reducer";
import { toast } from "react-toastify";

const sellerLoad = async(dispatch) => {

    try {
      dispatch(loadSellerStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/shop/getSeller` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadSellerSuccess(res.data.data));
        console.log("seller loaded Successfully!" , res)
      }).catch(err => {
        dispatch(loadSellerFail(err.response.data))
        console.log("Error while loading the seller" , err)
      })
    } catch (error) {
     dispatch(loadSellerFail(error))
     console.log("Error while loading the seller" , error)
    }

}

export {sellerLoad}