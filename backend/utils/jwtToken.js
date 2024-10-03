/** @format */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // '1m' from config.env
  });

  // Decode token to check expiration time
  const decodedToken = jwt.decode(token);
  console.log("Token Expiration Time:", new Date(decodedToken.exp * 1000));

  res.status(statusCode).json({
    success: true,
    message,
    token,
  });
};
