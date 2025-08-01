import express from "express";
import { upload } from "../utils/multer.js";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getEveryProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncError(createProduct)
);
router.get("/get-all-products/:id", catchAsyncError(getAllProducts));
router.get("/get-every-product", catchAsyncError(getEveryProduct));
router.delete("/delete-product/:id" , verifySeller , catchAsyncError(deleteProduct));
// router.post("/seller/activation" , catchAsyncError(activateSeller));
// router.post("/shop-login" , catchAsyncError(loginSeller));
// router.get("/getSeller" , verifySeller , getSeller);

// router.post("/login" , loginUser);
// router.get("/logout" , verifyToken , logout);

export default router;
