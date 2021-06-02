import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: protectedResolver(async (_, { page }, { client }) => {
      return await client.coffeeShop.findMany({
        skip: (page - 1) * 3,
        take: 3,
        include: {
          categories: true,
          photos: true,
          user: true,
        },
      });
    }),
  },
};

export default resolvers;
