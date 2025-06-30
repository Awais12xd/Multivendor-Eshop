import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./utils/errorHandler.js"
import authRoutes from "./routes/auth.routes.js"




const app = express();
//.env config
if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({
    path:"./.env",
})
}

//cors config
// const corsOptions = {
//     origin: process.env.CLIENT_URL || "*",
//     methods:["GET","PUT","DELETE","UPDATE"],
//     allowHeaders:[" Content-Type","Authorization"]
// }

//Middlewears
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/" , express.static("uploads"))

//Routes
app.use("/api/auth", authRoutes);


//error handling
app.use(errorHandler);

export {app}