import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { username } });

        if (!ok) {
          return {
            ok: false,
            error: "팔로우를 취소할 유저가 존재하지 않습니다.",
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                username,
              },
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
