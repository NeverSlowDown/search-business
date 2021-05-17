import { gql } from "@apollo/client";

export const SEARCH_LOCATION_BUSINESSES = gql`
  query search($location: String) {
    search(location: $location, limit: 10) {
      total
      business {
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

// -[]  Imagen del negocio.
// - []  Nombre del negocio.
// - []  Ubicación.
// - []  Número de reviews.
// - []  Raiting.
// - []  Teléfono de contacto.
