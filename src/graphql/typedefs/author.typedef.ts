import { gql } from "graphql-tag";
import { bookTypeDefs } from "./book.typedef";

export const authorTypeDefs = gql`
  enum Gender {
    MALE
    FEMALE
    OTHERS
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    gender: Gender!
    createdAt: String!
    updatedAt: String!
    books: [Book!]!
  }

  input AuthorInput {
    name: String!
    age: Int!
    gender: Gender!
  }

  type DeleteResponseType {
    id: ID!
  }

  type Query {
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author
    updateAuthor(authorId: ID!, input: AuthorInput!): Author
    deleteAuthor(authorId: ID!): DeleteResponseType
  }
`;
