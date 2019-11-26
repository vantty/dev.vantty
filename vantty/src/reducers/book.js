import { GET_BOOK, ADD_BOOK, BOOK_ERROR } from "../actions/types";

const initialState = {
  book: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOK:
      return {
        ...state,
        book: payload
      };
    // case REMOVE_ALERT:
    //   return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
