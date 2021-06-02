import { gql } from "apollo-server-core";

export default gql `
  type Query {
    seeCategory(page: Int): [Category]
  }
`;