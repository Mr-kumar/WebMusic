import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { response } from "express";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEYS,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadONCloudinary = async (localServerFile) => {
  try {
    if (!localServerFile) return null;
    //upload the file on the cloudinary
    cloudinary.uploader.upload(localServerFile, {
      resource_type: "auto",
    });
    //file has been uploaded successfull
    console.log("file has been uploaded on the cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localServerFile); //remove the locally saved tempary file as the upload get failed
    return null;
  }
};

export { uploadONCloudinary };
