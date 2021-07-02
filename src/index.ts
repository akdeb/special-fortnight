import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { MovieResolver } from "./resolvers/MovieResolver";

(async () => {
  // start an express app
  const app = express();
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );

  // create the typeoRM connection
  await createConnection({ ...options, name: "default" });

  // creating an apollo server with graphql schema anc context
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  // connect apollo middleware with express instance
  apolloServer.applyMiddleware({ app, cors: false });

  // start the server here
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
