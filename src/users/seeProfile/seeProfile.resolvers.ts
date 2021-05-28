import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    seeProfile: async (_, args, { client }) => {
      return await client.user.findMany();
    },
  },
};

export default resolvers;
