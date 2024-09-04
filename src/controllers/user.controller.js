import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadONCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registeruser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // Validate required fields
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
  // console.log(req.files);

  // Handle file uploads
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  let avatar, coverImage;

  try {
    // Upload avatar
    avatar = await uploadONCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      throw new ApiError(500, "Failed to upload avatar");
    }

    // Upload cover image if present
    if (coverImageLocalPath) {
      coverImage = await uploadONCloudinary(coverImageLocalPath);
      if (!coverImage || !coverImage.url) {
        throw new ApiError(500, "Failed to upload cover image");
      }
    } else {
      coverImage = { url: "" }; // Default to empty if no cover image provided
    }
  } catch (error) {
    throw new ApiError(500, "Error uploading files to Cloudinary");
  }

  // Create new user
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  // Retrieve and exclude sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registeruser };

//get user details from the frontend
//validation for the correctness of the data
//check if user already exist:username or email
//check for images and check for the avatar
//upload them to cloudinary:{again avatar cloundinary pe upload kiya ki nhi}
//create user object -create entry in db
//remove password and refresh token field from response
//check for the user creation
//return response
