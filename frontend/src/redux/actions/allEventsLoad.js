import axios from "axios";
import { loadAllEventsFail, loadAllEventsStart, loadAllEventsSuccess } from "../reducers/allEvents.reducer.js";


const allEventsLoad = async(dispatch) => {

    try {
      dispatch(loadAllEventsStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/event/get-every-event` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadAllEventsSuccess(res.data.data));
      }).catch(err => {
        dispatch(loadAllEventsFail(err.response.data))
        console.log("Error while loading the all Events" , err)
      })
    } catch (error) {
     dispatch(loadAllEventsFail(error))
     console.log("Error while loading the all Events" , error)
    }

}

export {allEventsLoad}

