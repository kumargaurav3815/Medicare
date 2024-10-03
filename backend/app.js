/** @format */

import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
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

// Error handling middleware
app.use(errorMiddleware);

export default app;
