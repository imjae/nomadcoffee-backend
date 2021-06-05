require("dotenv").config();
import * as http from "http";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
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

app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
