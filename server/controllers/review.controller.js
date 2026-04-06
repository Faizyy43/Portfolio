import Review from "../models/Review.js";

// 🔥 CREATE REVIEW (FROM FRONTEND)
export const createReview = async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    const review = await Review.create({
      name,
      message,
      rating,
      approved: false,
    });

    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET APPROVED REVIEWS (FRONTEND)
export const getApprovedReviews = async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({
    createdAt: -1,
  });

  res.json(reviews);
};

// 🔥 ADMIN: GET ALL REVIEWS
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
};

// 🔥 APPROVE REVIEW
export const approveReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, {
    approved: true,
  });

  res.json({ success: true });
};

// 🔥 REJECT / DELETE
export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};