import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "client",
  },

  lastLogin: Date,
  loginHistory: [
    {
      ip: String,
      device: String,
      date: Date,
    },
  ],
});

export default mongoose.model("User", userSchema);
