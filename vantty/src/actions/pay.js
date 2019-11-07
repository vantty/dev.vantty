import { PAY_SUCCESS, PAY_FAIL } from "./types";
const log = console.log;

export const payment = token => async dispatch => {
  log("ACTION", token);
  await dispatch({
    type: PAY_SUCCESS,
    payload: token
  });
};
