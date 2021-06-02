import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { client, loggedInUser }
      ) => {
        let photoArr = [];
        if (photos) {
          photoArr = photos.map((photo: any) => {
            return {
              where: { url: photo },
              create: { url: photo },
            };
          });
        }
        
        let categoryArr = [];
        if (categories) {
          categoryArr = categories.map((category: any) => {
            return {
              where: { slug: category },
              create: { slug: category, name: category },
            };
          });
        }
        console.log(categoryArr);
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: { id: loggedInUser.id },
            },
            ...(categories.length > 0 && {
              categories: {
                connectOrCreate: categoryArr,
              },
            }),
            ...(photos.length > 0 && {
              photos: {
                connectOrCreate: photoArr,
              },
            }),
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
