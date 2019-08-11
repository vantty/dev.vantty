import { CHANGE_NAVBAR_VALUE } from "../actions/types";

const initialState = {
  navbarValue: "",
  isOwner: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_NAVBAR_VALUE:
      return {
        ...state,
        navbarValue: payload
      };
    default:
      return state;
  }
}
