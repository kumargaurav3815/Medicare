/** @format */

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";

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
  // if (role !== user.role) {
  //   return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  // }
  generateToken(user, "Login Successful", 201, res);
  //   res.status(200).json({
  //     success: true,
  //     message: "Login Successful",
  //   });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Please fill complete details!", 400));
  }
  //find by user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }
  // const token = jwt.sign({ id: user._id }, "JWT_SECRET_KEY", {
  //   expiresIn: "1d",
  // });
  generateToken(user, "Password Reset Successful", 201, res);
  //   res.status(200).json({
  //     success: true,
  //     message: "Login Successful",
  //   });
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !gender || !password) {
    return next(new ErrorHandler("Please Fill complete details", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} With This Email Already Exists!`,
        400
      )
    );
  }
  //only admin can register new admin
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const { firstName, lastName, email, phone, gender, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !gender ||
    !password ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill complete details!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with This Email Already Exists!`,
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    // return next(
    //   new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    // );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    password,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout function for admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

// Logout function for patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});
