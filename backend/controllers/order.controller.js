import { Order } from "../models/order.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";

const createOrder = async (req, res, next) => {
  try {
    const { cart, user, shippingAddress, totalPrice, paymentInfo } = req.body;
    const shopItemsMap = new Map();
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }
    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        user,
        shippingAddress,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }
    res
      .status(200)
      .json(new apiResponse(200, "Order created successfully!", orders));
  } catch (error) {
    return next(new errorHandler("Error while creating the order", 500));
  }
};

const getAllUsersOrder = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ "user._id": userId }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return next(new errorHandler("Orders not found.", 404));
    }

    res.status(200).json(new apiResponse(200, "Gets all users order!", orders));
  } catch (error) {
    return next(new errorHandler("Error getting users order", 500));
  }
};
const getAllSellersOrder = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const orders = await Order.find({ "cart.shopId": shopId }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return next(new errorHandler("Orders not found.", 404));
    }

    res
      .status(200)
      .json(new apiResponse(200, "Gets all sellers order!", orders));
  } catch (error) {
    return next(new errorHandler("Error getting sellers order", 500));
  }
};
// update order status by seller
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new errorHandler("Order not found with this id", 400));
    }
    const updateProduct = async (id, qty) => {
      const product = await Product.findById(id);
      if (!product) {
        return next(
          new errorHandler(
            "Product not found with this id while updating its stock",
            400
          )
        );
      }
      product.stock = product.stock - qty ;
      product.sold_out = product.sold_out + qty ;

      await product.save({validateBeforeSave:false})
    };
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateProduct(o._id, o.qty);
      });
    }
    console.log("No status" , req.body.status)
    order.status = req.body.status;
    if(req.body.status === "Delivered"){
         order.deliveredAt = Date.now();
         order.paymentInfo.status = "Succeeded"
    }

    await order.save({validateBeforeSave : false})
    
    res.status(200).json(new apiResponse(200, "Status Updated Successfully", order));
     

    
  } catch (error) {
    return next(new errorHandler("Error while updating the order status", 500));
  }
};

export { createOrder, getAllUsersOrder, getAllSellersOrder, updateOrderStatus };
