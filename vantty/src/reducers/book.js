import {
  CREATE_STRIPE_ACCOUNT,
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL,
  CREATE_STRIPE_CUSTOMER,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FAIL,
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  GET_BOOK,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  CHANGE_STATE_BOOKING,
  CHANGE_STATE_BOOKING_SUCCESS,
  CHANGE_STATE_BOOKING_FAIL,
  COMPLETE_SERVICE,
  COMPLETE_SERVICE_SUCCESS,
  COMPLETE_SERVICE_FAIL
} from "../actions/types";

const initialState = {
  book: [],
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_STRIPE_ACCOUNT:
    case CREATE_STRIPE_CUSTOMER:
    case ADD_CARD:
    case ADD_BOOK:
    case CHANGE_STATE_BOOKING:
    case COMPLETE_SERVICE:
      return {
        ...state,
        loading: true
      };
    case CREATE_STRIPE_CUSTOMER_SUCCESS:
    case CREATE_STRIPE_CUSTOMER_FAIL:
    case CREATE_STRIPE_ACCOUNT_SUCCESS:
    case CREATE_STRIPE_ACCOUNT_FAIL:
    case ADD_CARD_SUCCESS:
    case ADD_CARD_FAIL:
    case ADD_BOOK_SUCCESS:
    case ADD_BOOK_FAIL:
    case CHANGE_STATE_BOOKING_SUCCESS:
    case CHANGE_STATE_BOOKING_FAIL:
    case COMPLETE_SERVICE_SUCCESS:
    case COMPLETE_SERVICE_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_BOOK:
      return {
        ...state,
        book: payload
      };
    default:
      return state;
  }
}
