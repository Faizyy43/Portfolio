import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tech: [String],
    image: String,
    liveLink: String,
    githubLink: String,
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
