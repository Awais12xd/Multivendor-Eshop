import express from "express";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createMessage, getAllMessages } from "../controllers/message.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// router.post(
//   "/create-coupon-code",
//   verifySeller,
//   catchAsyncError(createCouponCode)
// );
router.post(
  "/create-message",
  upload.array("images"),
  catchAsyncError(createMessage)
);
router.get(
  "/get-all-messages/:id",
  catchAsyncError(getAllMessages)
);

export default router;
