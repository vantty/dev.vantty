import { SEARCH_SUCCESS, CLEAR_SEARCH, CLEAR_PROFILE } from "./types";

export const searchValue = value => async dispatch => {
  await dispatch({
    type: SEARCH_SUCCESS,
    payload: value
  });
};
export const clearSearch = () => async dispatch => {
  await dispatch({
    type: CLEAR_SEARCH
  });
};
