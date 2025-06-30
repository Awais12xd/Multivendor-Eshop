import fs from "fs";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import path from "path";
import { apiResponse } from "../utils/apiResponse.js";

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
    const user = await User.create({
      name: username,
      email,
      password,
      avatar: { public_id: 123, url: findUrl },
    });
    if (!user) {
      return next(new errorHandler("Failed to create user", 400));
    }

    res
      .status(201)
      .json(new apiResponse(201, "User created successfully", user));
  } catch (error) {
    return next(new errorHandler("Error creating user", 500));
  }
};

export { createUser };
