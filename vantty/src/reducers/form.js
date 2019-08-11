import {
  CREATE_PROFILE_FORM,
  CREATE_PORTFOLIO_FORM,
  INITIAL_STATE_FORM
} from "../actions/types";

const initialState = {
  profileForm: false,
  portfolioForm: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE_FORM:
      return {
        ...state,
        profileForm: true
      };
    case CREATE_PORTFOLIO_FORM:
      return {
        ...state,
        portfolioForm: true
      };

    case INITIAL_STATE_FORM:
      return {
        ...state,
        profileForm: false,
        portfolioForm: false
      };

    default:
      return state;
  }
}
