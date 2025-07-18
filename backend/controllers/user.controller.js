import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { errorHandler } from "../utils/errorHandler.js";


const getUser = async(req , res , next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(new errorHandler("User not found while verifying token", 404));
            }

            res.
            status(200).
            json(new apiResponse(true , "User found" , user));
        
    } catch (error) {
        
    }
}

export {
    getUser
}