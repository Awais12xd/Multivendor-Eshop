import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import shopRoutes from "./routes/shop.routes.js"
import productRoutes from "./routes/product.routes.js"
import eventRoutes from "./routes/event.routes.js"
import { errorMiddle } from "./middlewares/error.middleware.js"




const app = express();
//.env config
if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({
    path:"./.env",
})
}

//cors config
const corsOptions = {
    origin: "http://localhost:5173" || "*",
    credentials: true,
    // methods:["GET","PUT","DELETE","UPDATE"],
    // allowHeaders:[" Content-Type","Authorization"]
}

//Middlewears
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/" , express.static("uploads"))

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/event" , eventRoutes);



//error handling
app.use(errorMiddle);

export {app}