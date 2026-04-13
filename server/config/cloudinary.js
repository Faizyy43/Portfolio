import dotenv from "dotenv";
dotenv.config(); // 🔥 ADD THIS LINE (VERY IMPORTANT)

import { v2 as cloudinary } from "cloudinary";

console.log("CLOUDINARY ENV CHECK:");
console.log("NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SECRET:", process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
