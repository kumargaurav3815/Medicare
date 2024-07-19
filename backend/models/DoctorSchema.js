/** @format */

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const DoctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor", "Admin"],
  },
  // docAvatar: {
  //   public_id: String,
  //   url: String,
  // },
});

//hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

DoctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

DoctorSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const Doctor = mongoose.model("Doctor", DoctorSchema);
