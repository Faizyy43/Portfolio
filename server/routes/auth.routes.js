// import express from "express";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import { protect } from "../middleware/auth.middleware.js";
// import { allowRoles } from "../middleware/role.middleware.js";

// const router = express.Router();

// // 🔐 LOGIN ROUTE
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("LOGIN ATTEMPT:", email);

//     // 1. CHECK USER
//     const user = await User.findOne({ email: email.trim() });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // 2. CHECK ROLE (ADMIN ONLY)
//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Admin access only" });
//     }

//     // 3. CHECK PASSWORD
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(401).json({ message: "Wrong password" });
//     }

//     // 4. GENERATE TOKEN
//     const accessToken = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "15m" }, // short life
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET || "refresh123",
//       { expiresIn: "7d" },
//     );

//     res.json({
//       success: true,
//       accessToken,
//       refreshToken,
//       user: {
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/refresh", (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) return res.sendStatus(401);

//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET || "refresh123",
//     );

//     const newAccessToken = jwt.sign(
//       { id: decoded.id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "15m" },
//     );

//     res.json({ accessToken: newAccessToken });
//   } catch {
//     res.sendStatus(403);
//   }
// });

// router.get("/admin-data", protect, allowRoles("admin"), (req, res) => {
//   res.json({ msg: "Admin only data 🔐" });
// });

// router.get(
//   "/client-data",
//   protect,
//   allowRoles("client", "admin"),
//   (req, res) => {
//     res.json({ msg: "Client access data" });
//   },
// );

// export default router;

import express from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;