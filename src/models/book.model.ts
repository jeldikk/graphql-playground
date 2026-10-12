import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
    },
    pageCount: {
      type: Number,
      required: [true, "Page count is required"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author ID is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const Book = mongoose.model("Book", bookSchema);
