import { SEARCH_SUCCESS } from "../actions/types";

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
    default:
      return state;
  }
}
