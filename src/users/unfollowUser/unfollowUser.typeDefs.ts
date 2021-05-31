import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): MutationResult!
  }
`;
