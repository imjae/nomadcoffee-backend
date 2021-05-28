import { gql } from "apollo-server-core";

export default gql`
  type Query {
    dummy: String
  }

  type MutationResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String
      location: String
      password: String
      avatarURL: String
      githubUsername: String
    ): MutationResult!
  }
`;
