import { apiResponse } from "./apiResponse.js";

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // send only over HTTPS
      sameSite: "none", // allow cross-site cookie
    };
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json(new apiResponse(201, "token sent successfully", user, token));
  } catch (error) {
    console.log("error while sending jwt", error.message);
  }
};

export { sendToken };
