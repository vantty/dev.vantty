import { PAY_SUCCESS, PAY_FAIL } from "./types";
import { server } from "../utils/axios";
import setAlert from "./alert";
const log = console.log;

export const payment = (token, amount) => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ token, amount });
    const res = await server.post("/book/pay", body, config);
    log(res.data);
  } catch (error) {
    console.log(error);
  }
};
