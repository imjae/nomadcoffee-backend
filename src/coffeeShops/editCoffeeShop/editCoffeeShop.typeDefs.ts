import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      categories: [String]
      photos: [String]
    ): MutationResult
  }
`;
