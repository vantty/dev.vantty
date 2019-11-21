import { CREATE_STRIPE_ACCOUNT_SUCCESS } from "./types";
import { server } from "../utils/axios";
import { getStrategyEmail } from "../helpers";
import setAlert from "./alert";
const log = console.log;

// Create Stripe Artist Account
export const creacteStripeAccount = code => async dispatch => {
  try {
    const {
      data: { stripe_user_id }
    } = await server.post(`/book/create-account/${code}`);
    const {
      data: { _id }
    } = await server.get("/auth");
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

// Create Stripe Customer Id and Pay
export const payment = (
  token,
  stripeArtistAccount,
  amount
) => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const user = await server.get("/auth");
    const {
      data: { _id, stripeCustomerId }
    } = user;
    const email = getStrategyEmail(user.data);
    if (!stripeCustomerId) {
      const body = JSON.stringify({ token, email, _id });
      await server.post("/book/create-customer", body, config);
    }
    const body = JSON.stringify({ _id, stripeArtistAccount, amount });
    const res = await server.post("/book/pay", body, config);
  } catch (error) {
    console.log(error);
  }
};
