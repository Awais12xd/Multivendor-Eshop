import express from "express";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createOrder, getAllUsersOrder , getAllSellersOrder, updateOrderStatus, orderRefund, orderRefundSuccess } from "../controllers/order.controller.js";


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
  verifySeller,
  catchAsyncError(getAllSellersOrder)
)
router.put(
  "/update-order-status/:id",
  verifyToken,
  catchAsyncError(updateOrderStatus)
)
router.put(
  "/order-refund/:id",
  verifyToken,
  catchAsyncError(orderRefund)
)
router.put(
  "/order-refund-success/:id",
  verifySeller,
  catchAsyncError(orderRefundSuccess)
)

export default router;
