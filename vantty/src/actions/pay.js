import { CREATE_STRIPE_ACCOUNT_SUCCESS } from "./types";
import { server } from "../utils/axios";
import setAlert from "./alert";
import { loadUser } from "./auth";
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
    const resStripe = await server.post(`/book/confirm/${code}`);
    const resUser = await server.get("/auth");
    const { stripe_user_id } = resStripe.data;
    const { _id } = resUser.data;

    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ stripe_user_id, _id });
    const resSave = await server.post("/book/save-account", body, config);
    log(resSave.data);
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
