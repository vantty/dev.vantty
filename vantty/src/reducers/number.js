import { NUMBER_VERIFY_SUCCESS, NUMBER_VERIFY_FAIL } from "../actions/types";

const initialState = {
  numberIsVerified: false,
  numberVerified: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case NUMBER_VERIFY_SUCCESS:
      return {
        numberIsVerified: true,
        numberVerified: payload
      };
    case NUMBER_VERIFY_FAIL:
      return {
        numberIsVerified: false
      };

    default:
      return state;
  }
}
