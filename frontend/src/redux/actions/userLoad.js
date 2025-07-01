import axios from "axios";
import { loadUserFail , loadUserStart , loadUserSuccess } from "../reducers/user.reducer.js";
import { toast } from "react-toastify";

const userLoad = async(dispatch) => {

    try {
      dispatch(loadUserStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/getUser` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadUserSuccess(res.data.data));
        console.log("User loaded Successfully!")
      }).catch(err => {
        dispatch(loadUserFail(err.response.data))
        console.log("Error while loading the user" , err)
      })
    } catch (error) {
     dispatch(loadUserFail(error))
     console.log("Error while loading the user" , error)
    }

}

export {userLoad}