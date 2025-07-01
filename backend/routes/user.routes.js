import express from "express"
import { getUser} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/getUser" , verifyToken , getUser);


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
