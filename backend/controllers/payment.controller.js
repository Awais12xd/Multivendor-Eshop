import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentProcessStripe = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // amount must be in the smallest currency unit (e.g., cents)
      currency: "usd", // pkr won't work in live mode
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json(
      new apiResponse(
        200,
        "Payment Intent Created successfully",
        paymentIntent.client_secret
      )
    );
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
};

const getStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json(
      new apiResponse(
        200,
        "Stripe API key sent successfully",
        process.env.STRIPE_PUBLISHABLE_KEY
      )
    );
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
};

export { paymentProcessStripe, getStripeApiKey };
