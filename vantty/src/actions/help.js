import { SEND_EMAIL_HELP_CENTER_SUCCES } from "./types";
import { server } from "../utils/axios";
const log = console.log;

export const sendEmail = problem => async dispatch => {
  try {
    //   const config = {
    //     headers: { "Content-Type": "application/json" }
    //   };
    //   const body = JSON.stringify({ text });
    const res = await server.post("/help/send-email", problem);
    log("RES", res);
  } catch (error) {
    log(error);
  }
};
