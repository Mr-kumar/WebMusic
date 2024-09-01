import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true, // URL or path for the user's avatar
    },
    coverImage: {
      type: String, // URL or path for the cover image
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video", // Reference to the Video model
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);
//in this part we use the middleware of the mongoDb database that is use to encrypt the password before savig into the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});
//again when we have to validate the things when user have login then we have check whether they giving the correct password or not
userSchema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//for generating the jwt for more security
userSchema.methods.generateAcessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
// Export the User model
export const User = mongoose.model("User", userSchema);
