import { SERVICE_SUCCESS } from "../actions/types";

const initialState = {
  services: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SERVICE_SUCCESS:
      return {
        services: payload
      };

    default:
      return state;
  }
}
