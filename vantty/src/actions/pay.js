import { PAY_SUCCESS, PAY_FAIL, SERVICE_FAIL, SERVICE_SUCCESS } from "./types";
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

export const loadService = services => async dispatch => {
  try {
    // const config = {
    //   headers: { "Content-Type": "application/json" }
    // };
    // const body = JSON.stringify({ token, amount });
    // const res = await server.post("/book/pay", body, config);

    dispatch({
      type: SERVICE_SUCCESS,
      payload: services
    });
    log(services);
  } catch (error) {
    console.log(error);
  }
};
