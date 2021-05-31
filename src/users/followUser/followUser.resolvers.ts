import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { username } });
        console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "팔로우할 유저가 존재하지 않습니다.",
          };
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: { username },
            },
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
