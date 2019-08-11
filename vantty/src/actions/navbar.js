import { CHANGE_NAVBAR_VALUE } from "./types";

export const changeNavbarValue = value => async dispatch => {
  await dispatch({
    type: CHANGE_NAVBAR_VALUE,
    payload: value
  });
};
