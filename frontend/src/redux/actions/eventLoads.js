import axios from "axios";
import { toast } from "react-toastify";
import { deleteFail, deleteStart, deleteSuccess, loadEventsFail, loadEventsStart, loadEventsSuccess } from "../reducers/events.reducer.js";
import { useSelector } from "react-redux";

const eventsLoad = async(dispatch,id) => {

    try {
      dispatch(loadEventsStart());
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/event/get-all-events/${id}` , {
        withCredentials:true
      }).then((res) => {
        dispatch(loadEventsSuccess(res.data.data));
      }).catch(err => {
        dispatch(loadEventsFail(err.response.data))
        console.log("Error while loading the Events" , err)
      })
    } catch (error) {
     dispatch(loadEventsFail(error))
     console.log("Error while loading the Events" , error)
    }

}
const eventDelete = async(dispatch,id) => {

    try {
      dispatch(deleteStart());
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/event/delete-event/${id}` , {
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

export {eventsLoad , eventDelete}