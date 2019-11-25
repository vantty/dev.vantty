import {
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL
} from "../actions/types";

const initialState = {
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
        stripeAccount: null
      };
    default:
      return state;
  }
}
