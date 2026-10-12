import { Book } from "../models";
import { Types } from "mongoose";

export async function getAllBooks() {
  // Implement the logic to fetch all books from the database
  return await Book.find();
}

export async function getBookById(id: string) {
  // Implement the logic to fetch a book by its ID from the database
  const bookId = new Types.ObjectId(id);
  return await Book.findById(bookId);
}

export async function getBooksByAuthorId(authorId: string) {
  const authorObjectId = new Types.ObjectId(authorId);
  return await Book.find({ authorId: authorObjectId });
}

export async function createBook(
  data: Partial<{
    title?: string;
    pageCount?: number;
    publishedYear?: number;
    authorId?: string;
  }>,
) {
  // Implement the logic to create a new book in the database
  const authorObjectId = new Types.ObjectId(data.authorId);
  const newBook = new Book({
    ...data,
    authorId: authorObjectId,
  });
  return await newBook.save();
}

export async function updateBook(
  id: string,
  data: Partial<{
    title?: string;
    pageCount?: number;
    publishedYear?: number;
  }>,
) {
  // Implement the logic to update an existing book in the database
  const bookId = new Types.ObjectId(id);
  return await Book.findByIdAndUpdate(bookId, data, { new: true });
}

export async function deleteBook(id: string) {
  // Implement the logic to delete a book from the database
  const bookId = new Types.ObjectId(id);
  return await Book.findByIdAndDelete(bookId);
}
