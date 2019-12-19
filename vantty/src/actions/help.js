import { SEND_EMAIL_HELP_CENTER_SUCCESS } from "./types";
import { server } from "../utils/axios";

export const sendEmail = problem => async dispatch => {
  try {
    const res = await server.post("/help/send-email", problem);
    await dispatch({
      type: SEND_EMAIL_HELP_CENTER_SUCCESS,
      payload: true
    });
  } catch (error) {
    console.log(error);
  }
};
