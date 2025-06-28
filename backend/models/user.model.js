
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    avatar: {
      type: String, // cloudnary url
      required: true,
    },
   
    password: {
      type: String,
      required: [true, "Password is missing"],
    },
    role:{
      type:String,
      enum:["admin","user"],
      default:"user"
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// using bcrypt to hash password
// userSchema.pre("save",async function(next){
//   if(!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password,10);
//   next();
// })

// Comparing both of them 
// userSchema.methods.isPasswordCorrect = async function(password){
//   return await bcrypt.compare(password,this.password);
// }

// Generating Access Token
// userSchema.methods.generateAccessToken = function() {
//   return jwt.sign({
//     _id:this._id,
//     username:this.username,
//     email:this.emal,
//     role:this.role
//   },
//   process.env.ACCESS_TOKEN_SECRET,
//   {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//   }
// )
// }


// userSchema.methods.generateRefreshToken = function() {
//   return jwt.sign({
//     _id:this._id,
//     role:this.role
//   },
//   process.env.REFRESH_TOKEN_SECRET,
//   {
//     expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//   }
// )
// }


export const User = mongoose.model("User", userSchema);
