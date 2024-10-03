/** @format */

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !gender || !password) {
    return next(new ErrorHandler("Please fill complete details!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "User Registered", 200, res);
  //   res.status(200).json({
  //     success: true,
  //     message: "User Registered!",
  //   });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return next(new ErrorHandler("Please fill complete details!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
  //find by user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  generateToken(user, "Login Successful", 201, res);
});
