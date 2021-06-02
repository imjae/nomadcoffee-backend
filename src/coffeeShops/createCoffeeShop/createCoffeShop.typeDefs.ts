import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photos: [String]
      categories: [String]
    ): MutationResult!
  }
`;
