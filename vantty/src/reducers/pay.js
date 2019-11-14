import {
  PAY_SUCCESS,
  PAY_FAIL,
  SERVICE_FAIL,
  SERVICE_SUCCESS
} from "../actions/types";

const initialState = {
  token: null,
  services: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAY_SUCCESS:
      return {
        ...state,
        token: payload
      };
    case SERVICE_SUCCESS:
      return {
        services: payload
      };

    default:
      return state;
  }
}
