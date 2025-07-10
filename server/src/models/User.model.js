import mongoose, { Schema } from "mongoose";

const userScherma = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    industry: {
      type: String,
      required: false,
    },
    skills: String,
    assessments: String,
    resume: String,
    coverLetter: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userScherma);
export default User;
