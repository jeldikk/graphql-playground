import { Types } from "mongoose";
import type { ApolloContext } from "../../apollo/apollo.server";
import {
  getAllAuthors,
  getAuthorDetails,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthorId,
} from "../../services";

export const authorResolvers = {
  Query: {
    authors: async (_: any) => {
      const authors = await getAllAuthors();
      return authors;
    },
    author: async (_: any, args: { id: string }) => {
      const { id } = args;
      const author = await getAuthorDetails(new Types.ObjectId(id));
      return author;
    },
  },
  Author: {
    books: async (parent: any, args: any, context: ApolloContext) => {
      const bookId = parent.id;
      const books = await context.loaders.booksLoader.load(bookId);
      return books;
    },
  },
  Mutation: {
    createAuthor: async (
      _: any,
      args: { input: { name: string; age: number; gender: string } },
    ) => {
      const { age, gender, name } = args.input;
      const author = await createAuthor({ name, age, gender });
      return author;
    },
    updateAuthor: async (
      _: any,
      args: {
        authorId: string;
        input: { name: string; age: number; gender: string };
      },
    ) => {
      const {
        authorId,
        input: { name, age, gender },
      } = args;
      const author = await updateAuthor(new Types.ObjectId(authorId), {
        name,
        age,
        gender,
      });
      return {
        id: authorId,
        name,
        age,
        gender,
      };
    },
    deleteAuthor: async (_: any, args: { authorId: string }) => {
      const { authorId } = args;
      const author = await deleteAuthor(new Types.ObjectId(authorId));
      return {
        id: authorId,
      };
    },
  },
};
