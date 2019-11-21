import {
  GET_REVIEW,
  REVIEW_ERROR,
  REMOVE_COMMENT,
  ADD_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK
} from "./types";
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

// Get Review
// export const getReview = reviewId => async dispatch => {
//   try {
//     const res = await server.get(`/review/${reviewId}`);
//     dispatch({
//       type: GET_REVIEW,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: REVIEW_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add comment
export const addNewBook = (reviewId, formData) => async dispatch => {
  console.log(reviewId, formData);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await server.post(
      `/book/create-book/${reviewId}`,
      formData,
      config
    );
    await dispatch({
      type: ADD_BOOK,
      payload: true
    });

    await dispatch({
      type: CLEAR_BOOK
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (reviewId, commentId) => async dispatch => {
  try {
    await server.delete(`/review/comment/${reviewId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
