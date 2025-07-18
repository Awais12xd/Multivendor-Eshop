import fs from "fs";
import { errorHandler } from "../utils/errorHandler.js";
import path from "path";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import { Shop } from "../models/shop.model.js";
import { sendSellerToken } from "../utils/sendSellerToken.js";

const generateActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

const createShop = async (req, res, next) => {
  const { username, email, password, phoneNumber, zipCode, address } = req.body;
  try {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      !zipCode ||
      !phoneNumber
    ) {
      return next(new errorHandler("Please fill all the fields", 400));
    }
    const existingUser = await Shop.findOne({ email });
    if (existingUser) {
      // Delete the uploaded file if user already exists
      if (req.file && req.file.filename) {
        const filePath = path.join(process.cwd(), "uploads", req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            return next(new errorHandler("Error deleting file", 500));
          } else {
            return next(new errorHandler("User already exists", 400));
          }
        });
      } else {
        return next(new errorHandler("Seller already exists", 400));
      }
      return;
    }
    const filename = req.file.filename;
    const findUrl = path.join(filename);
    const shop = {
      name: username,
      email,
      password,
      avatar: { public_id: 123, url: findUrl },
      address,
      zipCode,
      phoneNumber,
    };
    // if (!user) {
    //   return next(new errorHandler("Failed to create user", 400));
    // }

    // res
    //   .status(201)
    //   .json(new apiResponse(201, "User created successfully", user));

    const activationToken = generateActivationToken(shop);
    const activationUrl = `http://localhost:5173/shop/seller/activation/${activationToken}`;

    try {
      await sendMail({
        to: shop.email,
        subject: "Please activate your shop",
        message: `Hello ${shop.name} , please activate your shop by clicking on this link ${activationUrl}`,
      });
      res
        .status(201)
        .json(
          new apiResponse(
            201,
            "Please check you email to activate your account",
            null
          )
        );
    } catch (error) {
      return next(
        new errorHandler(`Error sending email and ${error.message}`, 500)
      );
    }
  } catch (error) {
    return next(new errorHandler("Error creating seller", 500));
  }
};

//Activate the user
const activateSeller = async (req, res, next) => {
  const { activation_token } = req.body;
  if (!activation_token) {
    return next(new errorHandler("No activation token provided", 400));
  }
  try {
    const newUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    if (!newUser) {
      return next(new errorHandler("Invalid activation token", 400));
    }

    const { name, email, password, phoneNumber, zipCode, address, avatar } =
      newUser;  
    console.log("ACTIVATION HIT — 1", Date.now());
    let shop = await Shop.findOne({ email });
    console.log("ACTIVATION HIT — 2", Date.now());
     if (shop && shop.activated) {
        return next(new errorHandler("User already activated", 400));
      }
    console.log("ACTIVATION HIT — 3", Date.now());
    shop = await Shop.create({
      name,
      email,
      password,
      phoneNumber,
      zipCode,
      address,
      avatar,
    });
    console.log("ACTIVATION HIT — 4", Date.now());

    sendSellerToken(shop, 200, res);
  } catch (error) {
    console.error("Activation error:", error);
     if (error.code === 11000) { // Duplicate key error
    // Optionally: Check if the user is already activated
    return res.status(409).json({ message: "Account already activated or duplicate request." });
  }
    return next(
      new errorHandler(`Error activating seller: ${error.message}`, 500)
    );
  }
};

const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorHandler("Please provide email and password", 400));
    }
    const user = await Shop.findOne({ email }).select("+password");
    if (!user) {
      return next(new errorHandler("Invalid email! User does not exist.", 400));
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new errorHandler("Invalid password!", 400));
    }
    // sendToken(user, 200, res);
    sendSellerToken(user, 200, res);
  } catch (error) {
    return next(new errorHandler(` error catch${error.message}`, 500));
  }
};

const getSeller = async(req , res , next) => {
    try {
        const userId = req.seller.id;
        const seller = await Shop.findById(userId);
        if (!seller) {
            return next(new errorHandler("User not found while verifying token", 404));
            }

            res.
            status(200).
            json(new apiResponse(true , "User found" , seller));
        
    } catch (error) {
        
    }
}

const logout = async (req, res, next) => {
  try {
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(201)
      .cookie("token", null, options)
      .json(new apiResponse(201, "Logout Successfully"));
  } catch (error) {
    return next(new errorHandler(` error catch ${error.message}`, 500));
  }
};

export {
  createShop,
  generateActivationToken,
  activateSeller,
  loginSeller,
  getSeller,
  logout,
};
