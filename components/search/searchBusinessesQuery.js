import { gql } from "@apollo/client";

export const SEARCH_LOCATION_BUSINESSES = gql`
  query search($location: String) {
    search(location: $location, limit: 20) {
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
