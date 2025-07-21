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
    shop: {
        type: Object,
        required: [true, "Please add the shop details"],
    },
    expiryDate : {
        type : Date , 
        required : [true , "Please enter the coupon expiry date"]
    },
},
{
    timestamps: true,
});


export const CouponCode = mongoose.model("CouponCode", couponCodeSchema);
