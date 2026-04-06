import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  budget: String,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Order", orderSchema);
