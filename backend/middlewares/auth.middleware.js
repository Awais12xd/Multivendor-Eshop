import { catchAsyncError } from "./catchAsyncError.js";
import jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import { Shop } from "../models/shop.model.js";

const verifyToken = catchAsyncError(async(req,res,next) => {
   try {
     const token = req.cookies.token;
    if (!token) {
        return next(new errorHandler("You are not logged in", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new errorHandler("User not found yesah", 404));
    }
    req.user = user;
    next();
   } catch (error) {
    return next(new errorHandler("Invalid token", 400));
    
   }

})
const verifySeller = catchAsyncError(async(req,res,next) => {
   
   try {
     const token = req.cookies.seller_token;
    if (!token) {
        return next(new errorHandler("You are not logged in", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const seller = await Shop.findById(decoded.id);
    if (!seller) {
        return next(new errorHandler("seller not found yesah", 404));
    }

    req.seller = seller;
     

    next();
   } catch (error) {
    return next(new errorHandler("Invalid token", 400));
    
   }

})

export {verifyToken ,verifySeller }