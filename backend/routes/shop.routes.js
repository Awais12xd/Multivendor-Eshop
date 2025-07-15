import express from "express"
import { upload } from "../utils/multer.js";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import { activateSeller, createShop, getSeller, loginSeller } from "../controllers/shop.controller.js";
const router = express.Router();

router.post("/create-shop", upload.single("file"), createShop);
router.post("/seller/activation" , catchAsyncError(activateSeller));
router.post("/shop-login" , catchAsyncError(loginSeller));
router.get("/getSeller" , verifySeller , getSeller);

// router.post("/login" , loginUser);
// router.get("/logout" , verifyToken , logout);




export default router;
