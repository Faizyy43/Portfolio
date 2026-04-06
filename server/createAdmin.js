import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // 🔍 CHECK IF ADMIN EXISTS
    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // 🔐 HASH PASSWORD
    const hash = await bcrypt.hash("123456", 10);

    // 👤 CREATE ADMIN
    await User.create({
      email: "admin@gmail.com",
      password: hash,
      role: "admin",
    });

    console.log("🔥 Admin created successfully");
    console.log("👉 Email: admin@gmail.com");
    console.log("👉 Password: 123456");

    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

run();
