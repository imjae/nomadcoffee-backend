import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, location, password: newPassword, avatarURL, githubUsername },
        { loggedInUser, client }
      ) => {
        let avatar = null;
        if (avatarURL) {
          avatar = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
        }
        // if (avatar) {
          // avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          // const { filename, createReadStream } = await avatar;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/uploads/" + newFilename
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/statics/${newFilename}`;
        // }

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const editUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatar && { avatarURL: avatar, }),
            githubUsername,
          },
        });

        if (editUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Failed editProfile",
          };
        }
      }
    ),
  },
};
