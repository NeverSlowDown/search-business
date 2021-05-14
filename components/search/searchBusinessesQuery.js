import { gql } from "@apollo/client";

export const SEARCH_BUSINESSES = gql`
  query search {
    search(location: "san francisco") {
      total
      business {
        name
      }
    }
  }
`;
