import * as t from "../types";

const main = (
  state = {
    search: "initial search",
  },
  action
) => {
  switch (action.type) {
    case t.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
