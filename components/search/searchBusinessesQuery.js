import { gql } from "@apollo/client";

export const SEARCH_BUSINESSES = gql`
  query search($location: String) {
    search(location: $location) {
      total
      business {
        name
        id
        alias
        rating
        url
        photos
      }
    }
  }
`;
