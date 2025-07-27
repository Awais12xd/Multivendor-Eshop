import axios from "axios";
import { loadUserFail, loadUserStart, loadUserSuccess, updateUserFail, updateUserStart, updateUserSuccess } from "../reducers/user.reducer.js";
import { toast } from "react-toastify";

const userLoad = async (dispatch) => {
  try {
    dispatch(loadUserStart());
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}/user/getUser`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadUserSuccess(res.data.data));
        console.log("User loaded Successfully!");
      })
      .catch((err) => {
        dispatch(loadUserFail(err.response.data));
        console.log("Error while loading the user", err);
      });
  } catch (error) {
    dispatch(loadUserFail(error));
    console.log("Error while loading the user", error);
  }
};
const userUpdate = (name, email, password, phoneNumber) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    await axios
      .put(
        `${import.meta.env.VITE_SERVER_URL}/user/update-user`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(updateUserSuccess(res.data.data));
        console.log("User Updated Successfully!");
        toast.success("Data updated successfully");
      })
      .catch((err) => {
        dispatch(updateUserFail(err.response.data));
        console.log("Error while updating the user", err);
        toast.error(err.response.data.message);

      });
  } catch (error) {
    dispatch(updateUserFail(error));
    console.log("Error while updtaing the user", error);
        toast.error(error.message);

  }
};

export { userLoad, userUpdate };
