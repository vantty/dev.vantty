import {
  PAY_SUCCESS,
  PAY_FAIL,
  CREATE_STRIPE_ACCOUNT_SUCCESS
} from "../actions/types";

const initialState = {
  token: null,
  stripeAccount: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAY_SUCCESS:
      return {
        ...state,
        token: payload
      };
    case CREATE_STRIPE_ACCOUNT_SUCCESS:
      return {
        ...state,
        stripeAccount: payload
      };
    default:
      return state;
  }
}
