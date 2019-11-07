import { PAY_SUCCESS, PAY_FAIL } from "../actions/types";

const initialState = {
  token: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAY_SUCCESS:
      return {
        ...state,
        token: payload
      };
    default:
      return state;
  }
}
