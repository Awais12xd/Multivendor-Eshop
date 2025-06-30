import express from "express"
import { createUser } from "../controllers/auth.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/sign-up", upload.single("file"), createUser);


export default router;
