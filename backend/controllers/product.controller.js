import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import fs from "fs";

const createProduct = async (req , res , next) => {
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

        const {name , description , category , originalPrice , discountPrice , tags , stock} = req.body;
        const product = await Product.create({
            name,
            description,
            category,
            originalPrice,
            discountPrice,
            tags,
            stock,
            shopId:shop._id,
            shop,
            images
        })
        if(!product){
            return next(new errorHandler("Failed to create product" , 400))
        }

        res.
        status(201)
        .json(new apiResponse(201, "Product created successfully" , product))


     } catch (error) {
        console.log("Error while product creation",error)
        return next(new errorHandler( error.message , 500 ));
     }
}

const getAllProducts = async(req , res , next) => {
    try {
        if(!req.params.id){
            return next(new errorHandler("Please provide the shop Id" , 400));
        }
        const products = await Product.find({shopId : req.params.id});
        if(!products || products.length === 0){
            return next(new errorHandler("No Products found for this shop" , 404));
        }
        res.
        status(200)
        .json(new apiResponse(true , "Products Found" , products))
        
    } catch (error) {
        console.log("Error while fetching products" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}
const getEveryProduct = async(req , res , next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        if(!products || products.length === 0){
            return next(new errorHandler("No Products found." , 404));
        }
        res.
        status(200)
        .json(new apiResponse(true , "Products Found" , products))
        
    } catch (error) {
        console.log("Error while fetching products" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}

const deleteProduct = async(req,res,next) => {
    try {
        const productId = req.params.id;
        if(!productId){
            return next(new errorHandler("Please provide the product Id" , 400))
        }
        const productData = await Product.findById(productId);
              if(!productData){
                  return next(new errorHandler("Product not found" , 404))
              }
              productData.images.forEach((image) => {
                  const path = `uploads/${image}`;
                  fs.unlinkSync(path , (err) => {
                      if(err){
                          console.log(err, "Error while deleting the image")
                      }
                  })
              })
              const product = await Product.findByIdAndDelete(productId);
              if(!product){
                  return next(new errorHandler("Product not found" , 404))
              }
        res.
        status(200)
        .json(new apiResponse(true , "Product Deleted Successfully"))
    } catch (error) {
        console.log("Error while deleting the product" , error);
        return next(new errorHandler(error.message , 500))
    }
}

export {
    createProduct,
    getAllProducts,
    getEveryProduct,
    deleteProduct
}