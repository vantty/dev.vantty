import { PAY_SUCCESS, PAY_FAIL } from "./types";
import { server, stripe } from "../utils/axios";
import setAlert from "./alert";
const log = console.log;

const client_id = "ca_G8ZSxRaqpSpBlLsbbS5TTevLIRDo3cFF";
export const createStripeAccount = () => async dispatch => {
  try {
    window.location.href = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${client_id}`;
  } catch (error) {
    console.log(error);
  }
};

export const confirmStripeAccount = code => async dispatch => {
  try {
    const res = await server.post(`/book/confirm/${code}`);
    log(res);
    // await dispatch(register(token));
  } catch (error) {
    console.log(error);
  }
};

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
