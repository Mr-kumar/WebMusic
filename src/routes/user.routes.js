// src/routes/user.routes.js

import express from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

// Define a route for user registration with specific file upload fields
userRouter.post(
  "/register",
  upload.fields([
    {
      name: "avatar", // Field name for avatar
      maxCount: 1, // Maximum number of files for this field
    },
    {
      name: "coverImage", // Field name for cover image
      maxCount: 1, // Maximum number of files for this field
    },
  ]),
  registeruser
);

export default userRouter;
