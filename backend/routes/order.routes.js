import express from "express";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createOrder } from "../controllers/order.controller.js";


const router = express.Router();

router.post(
  "/create-order",
  verifyToken,
  catchAsyncError(createOrder)
);

export default router;
