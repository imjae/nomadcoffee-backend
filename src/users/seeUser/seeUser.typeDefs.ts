import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    seeUser(username: String!): User!
  }
`;
