import client from "../client";

export default {
  User: {
    followers: async ({ id }, { page }) => {
      return await client.user.findMany({
        where: { following: { some: { id } } },
        skip: (page - 1) * 3,
        take: 3,
      });
    },

    following: async ({ id }, { page }) => {
      return await client.user.findMany({
        where: { followers: { some: { id } } },
        skip: (page - 1) * 3,
        take: 3,
      });
    },
  },
};
