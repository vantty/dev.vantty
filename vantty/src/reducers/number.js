import { NUMBER_VERIFY_SUCCESS, NUMBER_VERIFY_FAIL } from "../actions/types";

const initialState = {
  numberIsVerified: false
};

export default function(state = initialState, { type }) {
  switch (type) {
    case NUMBER_VERIFY_SUCCESS:
      return {
        numberIsVerified: true
      };
    case NUMBER_VERIFY_FAIL:
      return {
        numberIsVerified: false
      };

    default:
      return state;
  }
}
