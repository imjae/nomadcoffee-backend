import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Category: {
    totalShops: async ({ id }) => {
      console.log("totalshops");
      return await client.category.count({
        where: { shops: { some: { categories: { some: { id } } } } },
      });
    },
  },
};

export default resolvers;
