import { makeExecutableSchema } from "apollo-server-express";
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolovers = loadFilesSync(
  `${__dirname}/**/*.resolvers.ts`
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolovers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
