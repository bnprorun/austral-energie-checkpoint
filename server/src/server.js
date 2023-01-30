import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import express from "express";
import typeDefs from "./graphql/type/index.js";
import resolvers from "./graphql/resolver/index.js";
import context from "./context/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import morgan from "morgan";
import cors from "cors";

mongoose.set("strictQuery", false);

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

(async () => {
  await server.start();

  app.use(
    "/",
    expressMiddleware(server, {
      context,
    })
  );
  app.listen(3000, async () => {
    try {
      await connectDB();
    } catch (error) {
      console.error("Erreur pour se connecter à la base de donnée.", error);
    }
  });
})();
