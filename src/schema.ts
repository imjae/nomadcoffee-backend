import { makeExecutableSchema } from "apollo-server-express";
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolovers = loadFilesSync(
  `${__dirname}/**/*.resolvers.*`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolovers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;
