import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadONCloudinary } from "../utils/cloudinary.js";
//this is the higher order function which return a function
import { ApiResponse } from "../utils/ApiResponse.js";

const registeruser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  //ek chiz ka bat hamesha yad rakhna ki req.body se form ya phir json wala hi data aata hai samjha

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requires");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar files is required");
  }
  //next upload on the clodinary
  const avatar = await uploadONCloudinary(avatarLocalPath);
  const coverImage = await uploadONCloudinary(coverimageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "avatar files is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd successfully"));
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
