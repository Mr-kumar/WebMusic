import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEYS,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadONCloudinary = async (localServerFile) => {
  try {
    if (!localServerFile) {
      throw new Error("No file provided for upload.");
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(localServerFile, {
      resource_type: "auto",
    });

    if (!result || !result.url) {
      throw new Error("Cloudinary upload failed.");
    }

    console.log("File has been uploaded to Cloudinary:", result.url);
    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);
    if (localServerFile && fs.existsSync(localServerFile)) {
      fs.unlinkSync(localServerFile); // Remove the locally saved temporary file if upload failed
    }
    throw error; // Re-throw the error to be caught in the controller
  }
};

export { uploadONCloudinary };
