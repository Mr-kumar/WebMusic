// src/routes/user.routes.js

import express from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

// Define a route for user registration with file uploads
userRouter.post(
  "/register",
  upload.fields([
    {
      name: "avtar", // Assuming "avatar" might be the intended name
      maxCount: 1,
    },
    {
      name: "coverImage", // Assuming "coverImage" is the intended name
      maxCount: 1,
    },
  ]),
  registeruser
);

export default userRouter;
