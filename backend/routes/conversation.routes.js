import express from "express";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createConversation, getSellerConversations, getUserConversations, updateLastMessage } from "../controllers/conversation.controller.js";


const router = express.Router();

// router.post(
//   "/create-coupon-code",
//   verifySeller,
//   catchAsyncError(createCouponCode)
// );
router.post("/create-conversation" , catchAsyncError(createConversation))
router.get("/get-seller-conversations/:id" ,verifySeller, catchAsyncError(getSellerConversations))
router.get("/get-user-conversations/:id" ,verifyToken, catchAsyncError(getUserConversations))
router.put("/update-last-message/:id" ,catchAsyncError(updateLastMessage))

export default router;
