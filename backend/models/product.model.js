import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your product name!"],
        trim: true,
        maxlength: [120, "Product name cannot exceed 120 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter your product description!"],
        maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
        type: String,
        required: [true, "Please enter your product category"],
        // enum: ["Electronics", "Clothing", "Books", "Home", "Beauty", "Other"],
        default: "Other",
    },
    originalPrice: {
        type: Number,
        required: true,
        min: [0, "Original price must be positive"],
    },
    discountPrice: {
        type: Number,
        required: true,
        min: [0, "Discount price must be positive"],
        validate: {
            validator: function (v) {
                return v <= this.originalPrice;
            },
            message: "Discount price should not exceed original price",
        },
    },
    tags: {
        type: String,
        required: [true, "Please enter your product tags"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your product stock"],
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    sold_out: {
        type: Number,
        default: 0,
        min: [0, "Sold out count cannot be negative"],
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: [true, "Please add the shop ID"],
    },
    shop: {
        type: Object,
        required: [true, "Please add the shop details"],
    },
    images: [
        {
            type: String,
            required: [true, "Please add at least one product image"],
        },
    ],
    // ratings: {
    //     type: Number,
    //     default: 0,
    //     min: [0, "Rating cannot be negative"],
    //     max: [5, "Rating cannot exceed 5"],
    // },
    // reviews: [
    //     {
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User",
    //             required: true,
    //         },
    //         rating: {
    //             type: Number,
    //             required: true,
    //             min: 1,
    //             max: 5,
    //         },
    //         comment: {
    //             type: String,
    //             required: true,
    //             maxlength: 1000,
    //         },
    //         createdAt: {
    //             type: Date,
    //             default: Date.now,
    //         },
    //     },
    // ],
},
{
    timestamps: true,
});


export const Product = mongoose.model("Product", productSchema);
