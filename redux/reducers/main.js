import { indexOf } from "ramda";
import * as t from "../types";

const main = (
  state = {
    location: "miami",
  },
  action
) => {
  switch (action.type) {
    case t.SET_SEARCH:
      return {
        ...state,
        location: action.payload,
      };

    case t.SET_BUSINESSES:
      return {
        ...state,
        businesses: action.payload,
      };

    case t.SET_BUSINESS_SEEN: {
      const list = [...state.businesses];
      const element = list.find((item) => item.id === action.payload);
      const indexOfElement = indexOf(element, list);
      let newBusinesses = [...state.businesses];
      newBusinesses[indexOfElement] = {
        ...element,
        seen: true,
      }

      return {
        ...state,
        businesses: newBusinesses,
      };
    }
    default:
      return { ...state };
  }
};

export default main;
