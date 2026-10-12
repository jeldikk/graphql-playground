import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
  },
  {
    timestamps: true,
  },
);

export const Author = mongoose.model("Author", authorSchema);
