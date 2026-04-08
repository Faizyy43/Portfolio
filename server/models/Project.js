import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tech: [String],

    image: {
      type: String,
      default: "", // prevent undefined
    },

    liveLink: { type: String, trim: true },
    githubLink: { type: String, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
