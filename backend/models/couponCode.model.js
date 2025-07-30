import mongoose, { Schema } from "mongoose";

const couponCodeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter coupon name!"],
        unique : true
    },
    value: {
        type: Number,
        required: true,
    },
    minAmount: {
        type: Number,
    },
    maxAmount: {
        type: Number,
    },
   shopId:{
     type: String,
     required: true,
    },
    selectedProduct:{
     type: String,
    },
},
{
    timestamps: true,
});


export const CouponCode = mongoose.model("CouponCode", couponCodeSchema);
