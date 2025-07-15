import { apiResponse } from "./apiResponse.js";

const sendSellerToken = (user,statusCode,res) => {
    try {
        const token = user.getJwtToken();
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res.status(statusCode).cookie('seller_token', token, options)
    .json(new apiResponse(201, 'token sent successfully',user,token))
    } catch (error) {
        console.log("error while sending jwt" , error.message)
    }
}

export {sendSellerToken}