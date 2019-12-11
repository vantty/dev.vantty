import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETE,
  USER_LOCATION,
  SAVE_CONFIRMATION_EMAIL,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  DELETE_CARD_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  currentLocation: "",
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case USER_LOCATION:
      return {
        ...state,
        currentLocation: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case SAVE_CONFIRMATION_EMAIL:
    case ADD_CARD_SUCCESS:
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case ADD_CARD_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
