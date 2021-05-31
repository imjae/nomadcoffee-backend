import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    searchUsers(keyword:String, page: Int!): [User]
  }
`;
