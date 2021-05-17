import * as t from "../types";

export const setSearchLocation = (name) => (dispatch) => {
  dispatch({
    type: t.SET_SEARCH,
    payload: name,
  });
};

export const setBusinesses = (name) => (dispatch) => {
  dispatch({
    type: t.SET_BUSINESSES,
    payload: name,
  });
};
