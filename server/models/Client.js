// models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    enum: ["lead", "in-progress", "completed"],
    default: "lead",
  },
  budget: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Client", clientSchema);