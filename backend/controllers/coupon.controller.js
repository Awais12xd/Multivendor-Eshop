import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Event } from "../models/event.model.js";
import fs from "fs";
import { CouponCode } from "../models/couponCode.model.js";


const createCouponCode = async (req , res , next) => {
    console.log(req.body)
     try {
         const data = req.body;
         console.log(data)
         if(!data){
             return next(new errorHandler("Please provide the coupon detials"  , 400))
         }
        const codeName = data.name;
        const existingCode = await CouponCode.findOne({name : codeName});
        if(existingCode){
            return next(new errorHandler("Coupon Code already exists" , 400))
        }
        const couponCode = await CouponCode.create(data);
        if(!couponCode){
            return next(new errorHandler("Failed to create the coupon code" , 400))
        }
        res.
        status(201)
        .json(new apiResponse(201,"Coupon code created successfully" ,couponCode))


     } catch (error) {
        console.log("Error while creating coupon code" , error);
        return next(new errorHandler(error.message , 500));
        
     }
}

const getAllCouponCodes = async(req , res , next) => {
    try {
        if(!req.params.id){
            return next(new errorHandler("Please provide the shop Id" , 400));
        }
        const coupons = await CouponCode.find({shopId : req.params.id});
        if(!coupons || coupons.length === 0){
            return next(new errorHandler("No coupons found for this shop" , 404));
        }
        res.
        status(200)
        .json(new apiResponse(true , "coupons Found" , coupons))
        
    } catch (error) {
        console.log("Error while fetching coupons" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}

const deleteCouponCode= async(req,res,next) => {
    try {
        const couponsId = req.params.id;
        if(!couponsId){
            return next(new errorHandler("Please provide the coupons id" , 400))
        }
        const coupons = await CouponCode.findById(couponsId);
        if(!coupons){
            return next(new errorHandler("coupon not found" , 404))
        }
      
        const coupon = await CouponCode.findByIdAndDelete(couponsId);
        if(!coupon){
            return next(new errorHandler("Error while deleting the Coupon" , 500))
        }
        res.
        status(200)
        .json(new apiResponse(true , "Coupon Deleted Successfully"))
    } catch (error) {
        console.log("Error while deleting the Coupon" , error);
        return next(new errorHandler(error.message , 500))
    }
}
const getCouponValue= async(req,res,next) => {
    try {
        const couponCode = await CouponCode.findOne({name:req.params.name});
        if(!couponCode){
            return next(new errorHandler("Coupon Code does not exit!" , 404))
        }
        res.
        status(200)
        .json(new apiResponse(true , "Coupon Get Successfully",couponCode))
    } catch (error) {
        console.log("Error while getting the Coupon value" , error);
        return next(new errorHandler(error.message , 500))
    }
}

export {
    createCouponCode,
    getAllCouponCodes,
    deleteCouponCode,
    getCouponValue,
}