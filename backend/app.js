import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import shopRoutes from "./routes/shop.routes.js"
import productRoutes from "./routes/product.routes.js"
import eventRoutes from "./routes/event.routes.js"
import couponRoutes from "./routes/coupon.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import orderRoutes from "./routes/order.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { errorMiddle } from "./middlewares/error.middleware.js"
import {fileURLToPath} from "url"
import path from "path"

// Get absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');


const app = express();
//.env config
if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({
    path:"./.env",
})
}


//cors config
const corsOptions = {
  origin: [ "https://multivendor-eshop.vercel.app" , "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

//Middlewears
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use("/" , express.static("uploads"))
// ✅ Serve uploads with absolute path
app.use("/", express.static(uploadsPath));


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/event" , eventRoutes);
app.use("/api/coupon" , couponRoutes);
app.use("/api/payment" , paymentRoutes)
app.use("/api/order" , orderRoutes)
app.use("/api/conversation" , conversationRoutes)
app.use("/api/message" , messageRoutes)



//error handling
app.use(errorMiddle);

export {app}