/** @format */

import express from "express";
import { config } from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { User } from "./models/userSchema.js";
import Appointment from "./models/Appointment.js";
import Consultation from "./models/Consultation.js";
import userRouter from "./router/userRouter.js";

config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());

// Initialize database connection
dbConnection();

// Routes
app.use("/api/v1/user", userRouter);

// Route for getting appointments
app.get("/api/v1/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Route for getting consultations
app.get("/api/v1/consultations", async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Failed to fetch consultations" });
  }
});

//Route for request password reset
app.post("/api/v1/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = generatePasswordResetToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/resetPassword/${token}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `
      <p>Hello ${user.firstName} ${user.lastName},</p>
      <p>You have requested to reset your password.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `
    );
    res
      .status(200)
      .json({ message: "Password reset instructions sent successfully" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ error: "Failed to request password reset" });
  }
});

// Route for reset password
app.post("/api/v1/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = password; // Use hashing for passwords in production
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// Route for sending appointment email
app.post("/api/v1/send-appointment-email", async (req, res) => {
  const { name, email, appointmentDate } = req.body;

  try {
    // Save to MongoDB
    const appointment = new Appointment({
      name,
      email,
      appointmentDate,
    });
    await appointment.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Appointment Details",
      html: `
        <p>Hello ${name},</p>
        <p>Your appointment details:</p>
        <ul>
          <li>Date: ${appointmentDate}</li>
        </ul>
        <p>Thank you for booking with us.</p>
      `,
    };

    await sendEmail(email, mailOptions.subject, mailOptions.html);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error handling appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Route for sending consultation email
app.post("/api/v1/send-email", async (req, res) => {
  const {
    name,
    email,
    appointmentDate,
    appointmentTime,
    callType,
    prescriptionNeed,
  } = req.body;

  try {
    // Save to MongoDB
    const consultation = new Consultation({
      name,
      email,
      appointmentDate,
      appointmentTime,
      callType,
      prescriptionNeed,
    });
    await consultation.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Consultation Details",
      html: `
        <p>Hello ${name},</p>
        <p>Your consultation details:</p>
        <ul>
          <li>Date: ${appointmentDate}</li>
          <li>Time: ${appointmentTime}</li>
          <li>Call Type: ${callType}</li>
          <li>Prescription Need: ${prescriptionNeed ? "Yes" : "No"}</li>
        </ul>
        <p>Thank you for booking with us.</p>
      `,
    };

    await sendEmail(email, mailOptions.subject, mailOptions.html);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error handling consultation:", error);
    res.status(500).json({ error: "Failed to book consultation" });
  }
});

// Helper functions
async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}

function generatePasswordResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Error handling middleware
app.use(errorMiddleware);

export default app;
