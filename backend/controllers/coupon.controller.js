import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Event } from "../models/event.model.js";
import fs from "fs";
import { CouponCode } from "../models/couponCode.model.js";


const createCouponCode = async (req , res , next) => {
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
        const events = await Event.find({shopId : req.params.id});
        if(!events || events.length === 0){
            return next(new errorHandler("No events found for this shop" , 404));
        }
        res.
        status(200)
        .json(new apiResponse(true , "events Found" , events))
        
    } catch (error) {
        console.log("Error while fetching events" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}

const deleteCouponCode= async(req,res,next) => {
    try {
        const eventId = req.params.id;
        if(!eventId){
            return next(new errorHandler("Please provide the event Id" , 400))
        }
        const eventData = await Event.findById(eventId);
        if(!eventData){
            return next(new errorHandler("Event not found" , 404))
        }
        eventData.images.forEach((image) => {
            const path = `uploads/${image}`;
            fs.unlinkSync(path , (err) => {
                if(err){
                    console.log(err, "Error while deleting the image")
                }
            })
        })
        const event = await Event.findByIdAndDelete(eventId);
        if(!event){
            return next(new errorHandler("Event not found" , 404))
        }
        res.
        status(200)
        .json(new apiResponse(true , "Event Deleted Successfully"))
    } catch (error) {
        console.log("Error while deleting the Event" , error);
        return next(new errorHandler(error.message , 500))
    }
}

export {
    createCouponCode,
    getAllCouponCodes,
    deleteCouponCode
}