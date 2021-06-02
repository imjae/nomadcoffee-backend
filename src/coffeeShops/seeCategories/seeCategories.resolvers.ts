import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeCategories: protectedResolver(
      async (_, {page}, {client}) => {
        return await client.category.findMany({
          skip: (page-1)*3,
          take: 3,
          include: {
            shops: true
          }
        })
      }
    )
  }
}

export default resolvers;