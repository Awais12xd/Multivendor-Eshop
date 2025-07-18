import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";

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
    console.log("Id in product" ,req.params.id)
    try {
        console.log("now starting to check id exist or not")
        if(!req.params.id){
            return next(new errorHandler("Please provide the shop Id" , 400));
        }

       
        const products = await Product.find({shopId : req.params.id});
        if(!products || products.length === 0){
            return next(new errorHandler("No Products found for this shop" , 404));
        }
        
    } catch (error) {
        console.log("Error while fetching products" , error)
        return next(new errorHandler(error.message, 500));
        
    }
}

export {
    createProduct,
    getAllProducts
}