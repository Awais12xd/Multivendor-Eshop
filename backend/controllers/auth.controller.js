import fs from "fs";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import path from "path";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

const generateActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (username === "" || email === "" || password === "") {
      return next(new errorHandler("Please fill all the fields", 400));
    }
    const existingUser = await User.findOne({ email });
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
        return next(new errorHandler("User already exists", 400));
      }
      return;
    }
    const filename = req.file.filename;
    const findUrl = path.join(filename);
    const user = {
      name: username,
      email,
      password,
      avatar: { public_id: 123, url: findUrl },
    };
    // if (!user) {
    //   return next(new errorHandler("Failed to create user", 400));
    // }

    // res
    //   .status(201)
    //   .json(new apiResponse(201, "User created successfully", user));

    const activationToken = generateActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        to: user.email,
        subject: "Please activate your account",
        message: `Hello ${user.name} , please activate your account by clicking on this link ${activationUrl}`,
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
    return next(new errorHandler("Error creating user", 500));
  }
};

//Activate the user
const activateUser = async (req, res, next) => {
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

    const { name, email, password, avatar } = newUser;
    const userYes = await User.findOne({ email });

    if (userYes) {
      return next(new errorHandler("User already activated", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    sendToken(user, 200, res);
  } catch (error) {
    return next(new errorHandler("Error activating user", 500));
  }
};

const loginUser = async(req,res,next) => {
    try {

      const {email,password} = req.body;
      if(!email || !password){
        return next(new errorHandler("Please provide email and password",400));
      }
      const user = await User.findOne({email}).select("+password");;
      if(!user){
        return next(new errorHandler("Invalid email! User does not exist.",400));
        }
      const isMatch = await user.comparePassword(password)
      if(!isMatch){
        return next(new errorHandler("Invalid password!",400));
      }
      sendToken(user,200,res);

      
    } catch (error) {
      return next(new errorHandler(` error catch${error.message}`, 500));
    }
}

const logout = async(req,res,next) => {
  try {
     const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res
    .status(201)
    .cookie('token', null, options)
    .json(new apiResponse(201, 'Logout Successfully'))
  } catch (error) {
      return next(new errorHandler(` error catch ${error.message}`, 500));
  }
}


export { createUser, generateActivationToken, activateUser , loginUser , logout };
