import express from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { getStripeApiKey, paymentProcessStripe } from "../controllers/payment.controller.js";


const router = express.Router();

router.post(
  "/process",
  catchAsyncError(paymentProcessStripe)
);
router.get(
  "/get-Stripe-apikey",
  catchAsyncError(getStripeApiKey)
);

export default router;
