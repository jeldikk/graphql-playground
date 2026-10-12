import { Author } from "../models";
import { Types } from "mongoose";

export async function getAllAuthors() {
  try {
    const authors = await Author.find();
    return authors;
  } catch (err) {
    console.error(err);
  }
}

export async function getAuthorDetails(id: Types.ObjectId) {
  try {
    const author = await Author.findById(id);
    return author;
  } catch (err) {
    console.error(err);
  }
}

export async function createAuthor(input: {
  name: string;
  age: number;
  gender: string;
}) {
  try {
    const author = new Author(input);
    await author.save();
    return author;
  } catch (err) {
    console.error(err);
  }
}
export async function updateAuthor(
  id: Types.ObjectId,
  input: {
    name: string;
    age: number;
    gender: string;
  },
) {
  try {
    const author = await Author.findByIdAndUpdate(id, input, { new: true });
    return author;
  } catch (err) {
    console.error(err);
  }
}
export async function deleteAuthor(id: Types.ObjectId) {
  try {
    const author = await Author.findByIdAndDelete(id);
    return author;
  } catch (err) {
    console.error(err);
  }
}
