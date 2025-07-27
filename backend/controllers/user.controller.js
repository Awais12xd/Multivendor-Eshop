import path from "path";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { errorHandler } from "../utils/errorHandler.js";
import fs from "fs";

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(
        new errorHandler("User not found while verifying token", 404)
      );
    }

    res.status(200).json(new apiResponse(true, "User found", user));
  } catch (error) {
    return next(new errorHandler("Error while getting user", 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    console.log("get data", name, email, password, phoneNumber);

    if (!name || !email || !password || !phoneNumber) {
      return next(new errorHandler("All fields are required!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    console.log("Find user", user);
    if (!user) {
      return next(new errorHandler("User not found", 404));
    }
    console.log(password);
    const isPasswordOk = await user.comparePassword(password);
    console.log(isPasswordOk);
    if (!isPasswordOk) {
      return next(new errorHandler("Wrong Password", 404));
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();

    res
      .status(200)
      .json(new apiResponse(200, "User updated successully", user));
  } catch (error) {
    return next(new errorHandler("Error while updating user", 500));
  }
};

const changeAvatar = async (req, res, next) => {
  try {
    console.log("req is hitting");

    const id = req.user.id;
    console.log(id);

    const userFound = await User.findById(id);
    if (!userFound) {
      return next(new errorHandler("User not found ", 404));
    }
    console.log("user found");
    const filePath = `uploads/${userFound.avatar.url}`;
    //   const filePath = path.join(process.cwd(), "uploads", userFound.avatar.url);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    console.log(fileUrl);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { "avatar.url": fileUrl },
      { new: true }
    );
    console.log(updatedUser);

    res
      .status(200)
      .json(new apiResponse(200, "Avatar updated successfully", updatedUser));
  } catch (error) {
    return next(new errorHandler("Error while changing the avatar ", 500));
  }
};

export { getUser, updateUser, changeAvatar };
