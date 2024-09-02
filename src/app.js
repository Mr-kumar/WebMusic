import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize Express app
const app = express();

// Middleware for CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to parse cookies
app.use(cookieParser());

// Importing routers
import userRouter from "./routes/user.routes.js";

// Use routers
app.use("/users", userRouter);

// Export the app instance
export { app };
