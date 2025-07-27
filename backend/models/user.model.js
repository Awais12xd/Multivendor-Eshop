import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber:{
    type: Number,
  },
  addresses:[
    {
      country: {
        type: String,
      },
      city:{
        type: String,
      },
      address1:{
        type: String,
      },
      address2:{
        type: String,
      },
      zipCode:{
        type: Number,
      },
      addressType:{
        type: String,
      },
    }
  ],
  role:{
    type: String,
    default: "user",
  },
  avatar:{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTime: {
    type: Date,
  },
}, 
{
  timestamps: true,
});



//  Hash password
userSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {

  console.log("Checking the pass" , enteredPassword)
  return await bcrypt.compare(enteredPassword, this.password);
};

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
