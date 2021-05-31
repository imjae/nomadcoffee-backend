import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    seeUser: protectedResolver(
      async (_, { username }, { client }) => {
        return await client.user.findUnique({
          where: { username },
          include: { followers: true },
        });
      }
    ),
  },
};

export default resolvers;
