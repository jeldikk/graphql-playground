import { ApolloContext } from "../../apollo/apollo.server";
import { Author } from "../../models";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAuthorDetails,
  getBooksByAuthorId,
} from "../../services";

export const bookResolvers = {
  Query: {
    books: async () => {
      const books = await getAllBooks();
      return books;
    },
    book: async (_: any, args: { id: string }) => {
      return await getBookById(args.id);
    },
  },
  Book: {
    author: async (parent: any, args: any, context: ApolloContext) => {
      //   console.log(context);
      const authorId = parent.authorId;
      const author = await context.loaders.authorsLoader.load(authorId);
      //   const author = await getAuthorDetails(authorId);
      return author;
    },
  },
  Mutation: {
    createBook: async (
      _: any,
      args: {
        input: {
          title: string;
          pageCount: number;
          publishedYear: number;
          authorId: string;
        };
      },
    ) => {
      const createdBook = await createBook({
        title: args.input.title,
        pageCount: args.input.pageCount,
        publishedYear: args.input.publishedYear,
        authorId: args.input.authorId,
      });
      return createdBook;
    },
    updateBook: async (
      _: any,
      args: {
        id: string;
        input: {
          title: string;
          pageCount: number;
          publishedYear: number;
        };
      },
    ) => {
      return await updateBook(args.id, {
        title: args.input.title,
        pageCount: args.input.pageCount,
        publishedYear: args.input.publishedYear,
      });
    },
    deleteBook: async (_: any, args: { id: string }) => {
      return await deleteBook(args.id);
    },
  },
};
