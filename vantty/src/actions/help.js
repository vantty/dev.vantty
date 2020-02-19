import { SEND_EMAIL_HELP_CENTER_SUCCESS } from "./types";
import { server } from "../utils/axios";

export const sendEmail = problem => async dispatch => {
  try {
    await server.post("/user/help", problem);
    await dispatch({
      type: SEND_EMAIL_HELP_CENTER_SUCCESS,
      payload: true
    });
  } catch (error) {
    console.log(error);
  }
};
