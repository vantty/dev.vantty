import { SEARCH_SUCCESS } from "./types";

export const searchValue = value => async dispatch => {
  await dispatch({
    type: SEARCH_SUCCESS,
    payload: value
  });
};
