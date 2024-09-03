import multer from "multer";
import path from "path";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, path.join(process.cwd(), "public", "temp")); // Updated path
  },
  filename: function (req, file, cb) {
    // Maintain the original file name
    cb(null, file.originalname);
  },
});

// Configure multer middleware
export const upload = multer({ storage });
