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
    const id = req.user.id;

    const userFound = await User.findById(id);
    if (!userFound) {
      return next(new errorHandler("User not found ", 404));
    }
    const filePath = `uploads/${userFound.avatar.url}`;
    //   const filePath = path.join(process.cwd(), "uploads", userFound.avatar.url);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { "avatar.url": fileUrl },
      { new: true }
    );

    res
      .status(200)
      .json(new apiResponse(200, "Avatar updated successfully", updatedUser));
  } catch (error) {
    return next(new errorHandler("Error while changing the avatar ", 500));
  }
};

const addNewAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        new errorHandler(`${req.body.addressType} address already exist`, 400)
      );
    }
    const existingAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );
    if (existingAddress) {
      Object.assign(existingAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }
    await user.save();

    res
      .status(200)
      .json(new apiResponse(200, "New address added successfully!", user));
  } catch (error) {
    return next(new errorHandler("Error while adding new address", 500));
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const userId = req.user.id;

    await User.updateOne(
      {
        _id: userId,
      },
      {
        $pull: { addresses: { _id: addressId } },
      }
    );
    const user = await User.findById(userId);

    res
      .status(200)
      .json(new apiResponse(200, "Address deleted successfully!", user));
  } catch (error) {
    return next(new errorHandler("Error while deleting user address", 500));
  }
};
const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("+password");
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch) {
      return next(new errorHandler("The old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new errorHandler(
          "The new password does not match with confirm password!",
          400
        )
      );
    }

    user.password = req.body.newPassword;
    await user.save();

    res
      .status(200)
      .json(new apiResponse(200, "Password Changed successfully!"));
  } catch (error) {
    return next(new errorHandler("Error while changing the password", 500));
  }
};
const getUserInfo = async (req, res, next) => {

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new errorHandler("User not found while verifying token", 404)
      );
    }

    res.status(200).json(new apiResponse(true, "User found", user));
  } catch (error) {
    return next(new errorHandler("Error while getting user info", 500));
  }
};
export {
  getUser,
  updateUser,
  changeAvatar,
  addNewAddress,
  deleteAddress,
  changePassword,
  getUserInfo,
};
