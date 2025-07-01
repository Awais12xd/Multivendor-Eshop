import express from "express"
import { createUser , activateUser , loginUser } from "../controllers/auth.controller.js";
import { upload } from "../utils/multer.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
const router = express.Router();

router.post("/sign-up", upload.single("file"), createUser);
router.post("/activation" , catchAsyncError(activateUser));
router.post("/login" , loginUser);


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
