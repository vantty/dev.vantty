import {
  // GET_REVIEW,
  REVIEW_ERROR,
  // REMOVE_COMMENT,
  ADD_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK,
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL,
  // CREATE_STRIPE_CUSTOMER_SUCCESS,
  // CREATE_STRIPE_CUSTOMER_FAIL,
  // PAY_SUCCESS,
  // PAY_FAIL,
  GET_BOOK,
  CHANGE_STATE_BOOKING,
  SERVICE_SUCCESS,
  CLEAR_CART,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  DELETE_CARD_SUCCESS,
  ADD_BOOKINGS
} from "./types";
import { getCurrentProfile } from "./profile";
import { server } from "../utils/axios";

import setAlert from "./alert";
import { loadUser } from "./auth";
const log = console.log;

// Create Stripe Artist Account
export const createStripeAccount = code => async dispatch => {
  try {
    const result = await server.post(`/stripe/account/${code}`);
    await dispatch({
      type: CREATE_STRIPE_ACCOUNT_SUCCESS,
      payload: result
    });
    await dispatch(loadUser());
    await dispatch(getCurrentProfile());
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_STRIPE_ACCOUNT_FAIL,
      payload: null
    });
  }
};

// Validate Card and Create Stripe ID
export const createStripeCustomer = token => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await server.post("/stripe/customer", { token }, config);
    await dispatch({
      type: ADD_CARD_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCard = token => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await server.post("/stripe/card", { token }, config);
    await dispatch({
      type: ADD_CARD_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADD_CARD_FAIL
    });
    dispatch(
      setAlert(
        "This card is already added. Please try with another one.",
        "error"
      )
    );
  }
};

export const deleteCard = stripeCardId => async dispatch => {
  try {
    const res = await server.delete(`/stripe/card/${stripeCardId}`);
    await dispatch({
      type: DELETE_CARD_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    log(error);
  }
};

// Complete Service
export const completeService = bookCode => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await server.post(`/book/complete/${bookCode}`, config);
    await dispatch(getBook());
  } catch (error) {
    log(error);
    dispatch(setAlert("You have entered a wrong code", "error"));
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

//Get Artists Bookings
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
  bookId,
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

    const user = await server.get("/user");
    const {
      data: { stripeCustomerId }
    } = user;
    const today = new Date();
    const body = {
      ...formData,
      requestDate: today.toString().substr(0, 24),
      timeStamp: today.getTime(),
      bookCode: bookCode,
      stripeCustomerId: stripeCustomerId,
      stripeArtistAccount: stripeArtistAccount
    };

    await server.post(`/book/create-book/${bookId}`, body, config);

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
    dispatch(setAlert("Request Sent", "success"));
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Change State
export const changeStateBooking = (
  bookingId,
  data,
  posponedText,
  byUser
) => async dispatch => {
  const formData = {
    state: data,
    text: posponedText
  };
  try {
    const res = await server.post(`/book/booking/${bookingId}`, formData);
    await dispatch({
      type: CHANGE_STATE_BOOKING,
      payload: res.data
    });
    if (byUser) {
      const {
        data: { _id }
      } = await server.get("/user");
      await dispatch(getUserBookings(_id));
    } else {
      await dispatch(getBook());
    }
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

//////////////////
///User Bookings
//////////////

//Get user bookings
export const getUserBookings = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await server.get(`/book/user-bookings/${id}`, config);

    dispatch({
      type: ADD_BOOKINGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
