import express from "express";
import { upload } from "../utils/multer.js";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createCouponCode } from "../controllers/coupon.controller.js";


const router = express.Router();

router.post(
  "/create-coupon-code",
  verifySeller,
  catchAsyncError(createCouponCode)
);
// router.get("/get-all-events/:id", catchAsyncError(getAllEvents));
// router.delete("/delete-event/:id" , verifySeller , catchAsyncError(deleteEvent));

export default router;
