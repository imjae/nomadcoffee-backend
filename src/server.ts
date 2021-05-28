require("dotenv").config();
import * as http from "http";
import * as express from "express";
import { ApolloServer } from "apollo-server";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
        client,
      };
    }
  },
  subscriptions: {
    onConnect: async (param) => {
      const token = param["token"];
      if (!param.hasOwnProperty("token")) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
  },
});

const PORT = process.env.PORT;

const app = express();

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
