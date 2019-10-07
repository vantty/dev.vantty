import { SEARCH_SUCCESS, CLEAR_SEARCH } from "../actions/types";

const initialState = {
  searchValue: "",
  goSearch: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchValue: payload,
        goSearch: true
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchValue: "",
        goSearch: false
      };
    default:
      return state;
  }
}
