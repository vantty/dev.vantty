import {
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL,
  GET_BOOK
} from "../actions/types";

const initialState = {
  book: [],
  loading: true,
  stripeAccount: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_STRIPE_ACCOUNT_SUCCESS:
      return {
        ...state,
        stripeAccount: payload
      };
    case CREATE_STRIPE_ACCOUNT_FAIL:
      return {
        ...state,
        stripeAccount: payload
      };
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
