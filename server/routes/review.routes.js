import express from "express";
import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

// 🔹 USER
router.post("/", createReview);
router.get("/", getApprovedReviews);

// 🔹 ADMIN
router.get("/all", getAllReviews);
router.put("/:id/approve", approveReview);
router.delete("/:id", deleteReview);

export default router;