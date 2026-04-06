import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    budget: String,
    timeline: String,
    projectType: String,
    file: String,
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);