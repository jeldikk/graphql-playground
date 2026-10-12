import type { Application } from "express";
import type { DocumentNode } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { json } from "express";
import { authorTypeDefs, bookTypeDefs } from "../graphql/typedefs";
import { authorResolvers, bookResolvers } from "../graphql/resolvers";
import DataLoader from "dataloader";
import { batchAuthors, batchBooksbyAuthorIds } from "../graphql/loaders";

function createAuthorsLoader() {
  return new DataLoader<string, any>(batchAuthors);
}

function createBooksLoader() {
  return new DataLoader<string, any>(batchBooksbyAuthorIds);
}

export interface ApolloContext {
  loaders: {
    authorsLoader: DataLoader<string, any>;
    booksLoader: DataLoader<string, any>;
  };
}

export async function startApolloServer(app: Application) {
  const typeDefs: DocumentNode[] = [authorTypeDefs, bookTypeDefs];
  const resolvers: any[] = [authorResolvers, bookResolvers];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer<ApolloContext>({
    schema,
    introspection: true,
  });
  await apolloServer.start();

  app.use(
    "/graphql",
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return {
          loaders: {
            authorsLoader: createAuthorsLoader(),
            booksLoader: createBooksLoader(),
          },
        };
      },
    }),
  );
}
