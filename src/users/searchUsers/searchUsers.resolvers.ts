import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    searchUsers: protectedResolver(async (_, { keyword, page }, { client }) => {
      return await client.user.findMany({
        where: { username: { startsWith: keyword } },
        take: 3,
        skip: (page - 1) * 3,
      });
    }),
  },
};

export default resolvers;
