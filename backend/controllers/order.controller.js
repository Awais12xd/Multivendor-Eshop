import { Order } from "../models/order.model.js";
import { errorHandler } from "../utils/errorHandler.js"
import {apiResponse} from "../utils/apiResponse.js"
 
const createOrder = async(req,res,next) => {
    try {
        const {cart,user,shippingAddress,totalPrice,payment} = req.body;
        const shopItemsMap = new Map();
        for(const item of cart){
            const shopId = item.shopId;
            if(!shopItemsMap.has(shopId)){
                shopItemsMap.set(shopId,[]);
            }
            shopItemsMap.get(shopId).push(item);
        }
        const orders = [];
        for(const [shopId, items] of shopItemsMap){
            const order = await Order.create({cart:items,user,shippingAddress,totalPrice,payment});
            orders.push(order);
        }
        res
        .status(200)
        .json(new apiResponse(200,"Order created successfully!" , orders))
    } catch (error) {
        return next(new errorHandler("Error while creating the order" , 500));
    }
}

export {
    createOrder,

}