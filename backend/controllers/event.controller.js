import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import { Event } from "../models/event.model.js";
import fs from "fs";


const createEvent = async (req , res , next) => {
     try {
        const shopId = req.body.shopId;
        if(!shopId){
            return next(new errorHandler("Please Provide the shopID" , 400));
        }
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new errorHandler("Shop not found" , 400));
        }
        const files = req.files;
        if(!files || files.lenght === 0){
            return next(new errorHandler("Please upload at least one image" , 400))
        }
        const images = files.map(file => file.filename);
        console.log(images)

        const {name , description , category , originalPrice , discountPrice , tags , stock , start_date , end_date , status} = req.body;
        const event = await Event.create({
            name,
            description,
            category,
            originalPrice,
            discountPrice,
            tags,
            stock,
            shopId:shop._id,
            shop,
            images,
            start_date,
            end_date,
            status
        })
        if(!event){
            return next(new errorHandler("Failed to create product" , 400))
        }

        res.
        status(201)
        .json(new apiResponse(201, "event created successfully" , event))


     } catch (error) {
        console.log("Error while event creation",error)
        return next(new errorHandler( error.message , 500 ));
     }
}

const getAllEvents = async(req , res , next) => {
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

const getEveryEvent = async(req , res , next) => {
    try {
      
        const events = await Event.find();
        if(!events || events.length === 0){
            return next(new errorHandler("No events found " , 404));
        }
        res.
        status(200)
        .json(new apiResponse(true , "All Events Found" , events))
        
    } catch (error) {
        console.log("Error while fetching events" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}

const deleteEvent= async(req,res,next) => {
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
    createEvent,
    getAllEvents,
    deleteEvent,
    getEveryEvent,
}