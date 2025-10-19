import express from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { getStripeApiKey, paymentProcessStripe } from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post(
  "/process",
  verifyToken,
  catchAsyncError(paymentProcessStripe)
);
router.get(
  "/get-Stripe-apikey",
  catchAsyncError(getStripeApiKey)
);

export default router;
