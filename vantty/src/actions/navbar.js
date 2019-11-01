import { CHANGE_NAVBAR_VALUE, CLEAR_PROFILE } from "./types";

export const changeNavbarValue = value => async dispatch => {
  // await dispatch({ type: CLEAR_PROFILE });
  await dispatch({
    type: CHANGE_NAVBAR_VALUE,
    payload: value
  });
};
