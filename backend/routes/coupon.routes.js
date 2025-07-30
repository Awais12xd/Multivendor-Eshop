import express from "express";
import { upload } from "../utils/multer.js";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createCouponCode, deleteCouponCode, getAllCouponCodes , getCouponValue } from "../controllers/coupon.controller.js";


const router = express.Router();

router.post(
  "/create-coupon-code",
  verifySeller,
  catchAsyncError(createCouponCode)
);
router.delete("/delete-coupon/:id" , verifySeller , catchAsyncError(deleteCouponCode));
router.get("/get-all-coupons/:id", catchAsyncError(getAllCouponCodes));
router.get("/get-coupon-value/:name", catchAsyncError(getCouponValue));

export default router;
