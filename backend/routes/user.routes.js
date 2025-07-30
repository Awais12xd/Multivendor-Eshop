import express from "express"
import { getUser, updateUser , changeAvatar , addNewAddress , deleteAddress , changePassword} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/getUser" , verifyToken , getUser);
router.put("/update-user" , verifyToken , updateUser);
router.put("/change-avatar",verifyToken, upload.single("file"), changeAvatar );
router.put("/add-address",verifyToken,  addNewAddress );
router.delete("/delete-address/:id",verifyToken,  deleteAddress );
router.put("/change-password",verifyToken,  changePassword );


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
