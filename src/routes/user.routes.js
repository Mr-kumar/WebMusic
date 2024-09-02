// src/routes/user.routes.js

import express from "express";
import { registeruser } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Define a route for user registration
userRouter.post("/register", registeruser);

export default userRouter;
