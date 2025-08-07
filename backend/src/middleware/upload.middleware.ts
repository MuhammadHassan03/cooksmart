import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Allowed MIME types for images
const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

// Create uploads directory if it doesn't exist
const uploadDir = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const safeName = file.fieldname.replace(/\s+/g, "-").toLowerCase(); // Sanitize field name
    const timestamp = Date.now(); // Timestamp for uniqueness
    const filename = `${timestamp}-${safeName}${ext}`; // Final file name
    cb(null, filename);
  },
});

// File filter to allow only specific image types
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!allowedImageTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed (jpg, jpeg, png, webp)"));
  }
  cb(null, true);
};

// Size limit: 5MB
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// Export the multer middleware
export const upload = multer({
  storage,
  fileFilter,
  limits,
});
