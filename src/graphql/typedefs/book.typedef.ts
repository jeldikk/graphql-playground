import { gql } from "graphql-tag";
import { authorTypeDefs } from "./author.typedef";

export const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    pageCount: Int!
    publishedYear: Int!
    authorId: String!
    createdAt: String!
    updatedAt: String!
    author: Author!
  }

  input BookInput {
    title: String!
    pageCount: Int!
    publishedYear: Int!
    authorId: String!
  }

  type DeleteResponseType {
    id: ID!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): DeleteResponseType!
  }
`;
