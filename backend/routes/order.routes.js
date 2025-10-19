import express from "express";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createOrder, getAllUsersOrder , getAllSellersOrder, updateOrderStatus } from "../controllers/order.controller.js";


const router = express.Router();

router.post(
  "/create-order",
  verifyToken,
  catchAsyncError(createOrder)
);
router.get(
  "/get-all-users-order/:id",
  verifyToken,
  catchAsyncError(getAllUsersOrder)
)
router.get(
  "/get-all-sellers-order/:id",
  verifyToken,
  catchAsyncError(getAllSellersOrder)
)
router.post(
  "/update-order-status/:id",
  verifyToken,
  catchAsyncError(updateOrderStatus)
)

export default router;
