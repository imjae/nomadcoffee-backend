import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User
    categories: [Category]
    photos: [CoffeeShopPhoto]
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int
  }

  type CoffeeShopPhoto {
    id: Int!
    url: Upload!
    shop: CoffeeShop
  }
`;
