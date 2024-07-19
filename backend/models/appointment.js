/** @format */

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
