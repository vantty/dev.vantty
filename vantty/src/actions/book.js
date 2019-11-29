import {
  GET_REVIEW,
  REVIEW_ERROR,
  REMOVE_COMMENT,
  ADD_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK,
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FAIL,
  PAY_SUCCESS,
  PAY_FAIL,
  GET_BOOK,
  CHANGE_STATE_BOOKING,
  SERVICE_SUCCESS,
  CLEAR_CART
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
    dispatch({
      type: CREATE_STRIPE_ACCOUNT_SUCCESS,
      payload: resSave.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_STRIPE_ACCOUNT_FAIL
    });
  }
};

// Complete Service
export const completeService = code => async dispatch => {
  try {
    const {
      data: { _id }
    } = await server.get("/auth");
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ _id, code });
    const res = await server.post("/book/complete-service", body, config);
    await dispatch(getBook());
  } catch (error) {
    log(error);
  }
};

// Validate Card and Create Stripe ID
export const validateCard = token => async dispatch => {
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
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////
//Booking
//////////////////////////

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
    // log(services);
  } catch (error) {
    console.log(error);
  }
};

export const getBook = () => async dispatch => {
  try {
    const res = await server.get(`/book`);

    dispatch({
      type: GET_BOOK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment

// Get Book by Id
export const getBookById = reviewId => async dispatch => {
  try {
    const res = await server.get(`/book/${reviewId}`);
    dispatch({
      type: GET_BOOK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Book
export const addNewBook = (
  reviewId,
  stripeArtistAccount,
  bookCode,
  formData
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const user = await server.get("/auth");
    const {
      data: { stripeCustomerId }
    } = user;
    const body = {
      ...formData,
      bookCode: bookCode,
      stripeCustomerId: stripeCustomerId,
      stripeArtistAccount: stripeArtistAccount
    };
    const res = await server.post(
      `/book/create-book/${reviewId}`,
      body,
      config
    );
    await dispatch({
      type: ADD_BOOK,
      payload: true
    });

    await dispatch({
      type: CLEAR_BOOK
    });
    await dispatch({
      type: CLEAR_CART
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Change State
export const changeStateBooking = (bookingId, data) => async dispatch => {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // };
  const formData = { state: data };
  log("STATUS", data);
  try {
    const res = await server.post(`/book/booking/${bookingId}`, formData);

    await dispatch({
      type: CHANGE_STATE_BOOKING,
      payload: res.data
    });
    await dispatch(getBook());
    // dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
// export const deleteComment = (reviewId, commentId) => async dispatch => {
//   try {

//     await server.delete(`/review/comment/${reviewId}/${commentId}`);

//     dispatch({
//       type: REMOVE_COMMENT,
//       payload: commentId
//     });

//     dispatch(setAlert("Comment Removed", "success"));
//   } catch (err) {
//     dispatch({
//       type: REVIEW_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
