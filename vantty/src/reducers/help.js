import { SEND_EMAIL_HELP_CENTER_SUCCESS } from "../actions/types";

const initialState = {
  sent: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_EMAIL_HELP_CENTER_SUCCESS:
      return {
        ...state,
        sent: payload
      };
    default:
      return state;
  }
}
