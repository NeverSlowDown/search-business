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

    default:
      return { ...state };
  }
};

export default main;
