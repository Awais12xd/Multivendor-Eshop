import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Shop } from "../models/shop.model.js";
import fs from "fs";
import { deleteFromCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinaryUpload.js";

const createProduct = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    if (!shopId) {
      return next(new errorHandler("Please Provide the shopID", 400));
    }
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new errorHandler("Shop not found", 400));
    }
    const files = req.files;
    if (!files || files.length === 0) {
      return next(new errorHandler("Please upload at least one image", 400));
    }

    // ✅ Upload multiple images to Cloudinary
    const cloudinaryResults = await uploadMultipleToCloudinary(files);
    const images = cloudinaryResults.map(result => ({
      public_id: result. public_id,
      url:  result.url,
    }));

    const {
      name,
      description,
      category,
      originalPrice,
      discountPrice,
      tags,
      stock,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      category,
      originalPrice,
      discountPrice,
      tags,
      stock,
      shopId: shop._id,
      shop,
      images,
    });
    if (!product) {
      return next(new errorHandler("Failed to create product", 400));
    }

    res
      .status(201)
      .json(new apiResponse(201, "Product created successfully", product));
  } catch (error) {
    console.log("Error while product creation", error);
    return next(new errorHandler(error.message, 500));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(new errorHandler("Please provide the shop Id", 400));
    }
    const products = await Product.find({ shopId: req.params.id });
    if (!products || products.length === 0) {
      return next(new errorHandler("No Products found for this shop", 404));
    }
    res.status(200).json(new apiResponse(true, "Products Found", products));
  } catch (error) {
    console.log("Error while fetching products", error);
    return next(new errorHandler(error.message, 500));
  }
};
const getEveryProduct = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products || products.length === 0) {
      return next(new errorHandler("No Products found.", 404));
    }
    res.status(200).json(new apiResponse(true, "Products Found", products));
  } catch (error) {
    console.log("Error while fetching products", error);
    return next(new errorHandler(error.message, 500));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return next(new errorHandler("Please provide the product Id", 400));
    }
    const productData = await Product.findById(productId);
    if (!productData) {
      return next(new errorHandler("Product not found", 404));
    }
    
    
    // ✅ Delete images from Cloudinary
    if (productData.images && productData.images.length > 0) {
      for (const image of productData.images) {
        try {
          await deleteFromCloudinary(image.public_id);
        } catch (error) {
          console.log("Error deleting image:", error);
        }
      }
    }


    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }
    res.status(200).json(new apiResponse(true, "Product Deleted Successfully"));
  } catch (error) {
    console.log("Error while deleting the product", error);
    return next(new errorHandler(error.message, 500));
  }
};

const createReview = async (req, res, next) => {
  try {
    const { user, rating, comment, productId , orderId } = req.body;
   
    const review = {
        user,
        rating,
        comment,
        productId
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(new errorHandler("The product not found", 404));
    }
    const isReviewed = product.reviews.find((rev) =>  rev.user._id === review.user._id);
    
    if(isReviewed){
      product.reviews.forEach((rev) => {
        if(rev.user._id === review.user._id){
            (rev.rating = rating) , (rev.comment = comment)
        }
      })
    }else{
        product.reviews.push(review);
    }

    let avg = 0 ;
    product.reviews.forEach((rev) =>  avg += rev.rating)
    product.ratings = avg / product.reviews.length;
    await product.save({validateBeforeSave : false});

    await Order.findByIdAndUpdate(orderId, {$set : {"cart.$[elem].isReviewed" : true}},
        {arrayFilters : [{"elem._id" : productId}] , new : true}
    )

    res
    .status(200)
    .json(new apiResponse(true, "Review Created Successfully"));

  } catch (error) {
    console.log("Error while creating the review", error);
    return next(new errorHandler(error.message, 500));
  }
};

export {
  createProduct,
  getAllProducts,
  getEveryProduct,
  deleteProduct,
  createReview,
};
