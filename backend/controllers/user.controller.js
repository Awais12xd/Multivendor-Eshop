import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { errorHandler } from "../utils/errorHandler.js";


const getUser = async(req , res , next) => {
    console.log("req is hitting")
    try {
        const userId = req.user.id;
        console.log(userId , "id is coming")
        const user = await User.findById(userId);
        if (!user) {
            return next(new errorHandler("User not found while verifying token", 404));
            }
            console.log("user found" , user)

            res.
            status(200).
            json(new apiResponse(true , "User found" , user));
        
    } catch (error) {
        
    }
}

export {
    getUser
}