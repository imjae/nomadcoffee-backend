import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories, photos },
        { client }
      ) => {
        let categoryArr = [];
        if (categories.length > 0) {
          const disconnectingCategoryArr = await client.category.findMany({
            where: { shops: { some: { id } } },
            select: { id: true },
          });

          await client.coffeeShop.update({
            where: { id },
            data: { categories: { disconnect: disconnectingCategoryArr } },
          });

          categoryArr = categories.map((category: any) => {
            return {
              where: { slug: category },
              create: { slug: category, name: category },
            };
          });
        }

        let photoArr = [];
        if (photos.length > 0) {
          const disconnectingPhoto = await client.coffeeShopPhoto.findFirst({
            where: { shop: { id } },
            select: { id: true },
          });

          await client.coffeeShop.update({
            where: { id },
            data: { photos: { disconnect: disconnectingPhoto } },
          });

          photoArr = photos.map((photo: any) => {
            return {
              where: { url: photo },
              create: { url: photo },
            };
          });
        }

        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            categories: { connectOrCreate: categoryArr },
            photos: { connectOrCreate: photoArr },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
