import * as bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername },
      { client, loggedInUser }
    ) => {
      let avatar = null;
      if (avatarURL) {
        avatar = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
      }

      if (!password) {
        return {
          ok: false,
          error: "password가 존재하지 않습니다.",
        };
      }

      if (!username || !email) {
        return {
          ok: false,
          error: "username이나 email를 작성해 주세요.",
        };
      }

      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        throw new Error("userName 이나 email 이 존재합니다.");
      }

      const uglyPassword = await bcrypt.hash(password, 10);

      const createdUser = await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          password: uglyPassword,
          avatarURL: avatar,
          githubUsername,
        },
      });

      if (createdUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "계정 생성에 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
