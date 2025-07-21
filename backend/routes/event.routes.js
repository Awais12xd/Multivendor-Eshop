import express from "express";
import { upload } from "../utils/multer.js";
import { verifySeller, verifyToken } from "../middlewares/auth.middleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { createEvent, deleteEvent, getAllEvents } from "../controllers/event.controller.js";


const router = express.Router();

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(createEvent)
);
router.get("/get-all-events/:id", catchAsyncError(getAllEvents));
router.delete("/delete-event/:id" , verifySeller , catchAsyncError(deleteEvent));
// router.post("/seller/activation" , catchAsyncError(activateSeller));
// router.post("/shop-login" , catchAsyncError(loginSeller));
// router.get("/getSeller" , verifySeller , getSeller);

// router.post("/login" , loginUser);
// router.get("/logout" , verifyToken , logout);

export default router;
