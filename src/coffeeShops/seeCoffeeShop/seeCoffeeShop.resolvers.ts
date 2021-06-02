import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop: protectedResolver(async (_, { id }, { client }) => {
      return await client.coffeeShop.findUnique({ where: { id } });
    }),
  },
};

export default resolvers;
