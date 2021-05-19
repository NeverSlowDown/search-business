import { gql } from "@apollo/client";

export const SEARCH_LOCATION_BUSINESSES = gql`
  query search($location: String, $term: String) {
    search(location: $location, term: $term, limit: 10) {
      total
      business {
        alias
        name
        id
        rating
        review_count
        photos
        phone
        location {
          address1
          city
        }
      }
    }
  }
`;

export const GET_BUSINESS_DETAILS_PARTIAL = gql`
  query business($id: String) {
    business(id: $id) {
      hours {
        is_open_now
        open {
          start
          end
        }
      }
      is_closed
      reviews {
        text
        rating
      }
      price
    }
  }
`;
export const GET_BUSINESS_DETAILS_FULL = gql`
  query business($id: String) {
    business(id: $id) {
      alias
      name
      id
      rating
      review_count
      photos
      phone
      location {
        address1
        city
      }
      hours {
        is_open_now
        open {
          start
          end
        }
      }
      is_closed
      reviews {
        text
        rating
      }
      price
    }
  }
`;
