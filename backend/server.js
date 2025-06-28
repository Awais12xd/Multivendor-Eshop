import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import { connectDb } from "./config/db.js";


const app = express();

dotenv.config({
    path:"./.env",
})

const corsOptions = {
    origin: process.env.CLIENT_URL || "*",
    methods:["GET","PUT","DELETE","UPDATE"],
    allowHeaders:[" Content-Type","Authorization"]
}


//Middlewears
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://locslhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error during using connectDb :", error);
  });