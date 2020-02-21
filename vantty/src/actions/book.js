import {
  CREATE_STRIPE_ACCOUNT,
  CREATE_STRIPE_ACCOUNT_SUCCESS,
  CREATE_STRIPE_ACCOUNT_FAIL,
  CREATE_STRIPE_CUSTOMER,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FAIL,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  //
  REVIEW_ERROR,
  BOOK_ERROR,
  CLEAR_BOOK,
  GET_BOOK,
  CHANGE_STATE_BOOKING,
  SERVICE_SUCCESS,
  CLEAR_CART,
  DELETE_CARD_SUCCESS,
  ADD_BOOKINGS
} from "./types";
import { getCurrentProfile } from "./profile";
import { server } from "../utils/axios";

import setAlert from "./alert";
import { loadUser } from "./auth";

// Create Stripe Artist Account
export const createStripeAccount = code => async dispatch => {
  try {
    await dispatch({ type: CREATE_STRIPE_ACCOUNT });
    await server.post(`/stripe/account/${code}`);
    await dispatch(loadUser());
    await dispatch(getCurrentProfile());
    await dispatch({ type: CREATE_STRIPE_ACCOUNT_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_STRIPE_ACCOUNT_FAIL });
  }
};

// Validate Card and Create Stripe ID
export const createStripeCustomer = token => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await dispatch({ type: CREATE_STRIPE_CUSTOMER });
    const res = await server.post("/stripe/customer", { token }, config);
    await dispatch({
      type: ADD_CARD_SUCCESS,
      payload: res.data
    });
    await dispatch({ type: CREATE_STRIPE_CUSTOMER_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_STRIPE_CUSTOMER_FAIL });
  }
};

export const addCard = token => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await dispatch({ type: ADD_CARD });
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
    console.log(error);
  }
};

//TODO: What is this?
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
  formData,
  address
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
      address: address,
      requestDate: today.toString().substr(0, 24),
      timeStamp: today.getTime(),
      bookCode: bookCode,
      stripeCustomerId: stripeCustomerId,
      stripeArtistAccount: stripeArtistAccount
    };
    await dispatch({ type: ADD_BOOK });
    await server.post(`/book/create-book/${bookId}`, body, config);
    await dispatch({ type: ADD_BOOK_SUCCESS });
    await dispatch({
      type: CLEAR_BOOK
    });
    await dispatch({
      type: CLEAR_CART
    });
    dispatch(setAlert("Request Sent", "success"));
  } catch (err) {
    dispatch({ type: ADD_BOOK_FAIL });
    // dispatch({
    //   type: BOOK_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
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

export const completeService = bookCode => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await server.post(`/book/complete/${bookCode}`, config);
    await dispatch(getBook());
  } catch (error) {
    const errors = error.response.data.message;
    dispatch(setAlert(errors, "error"));
  }
};

export const getUserBookings = () => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await server.get("/book/user-bookings", config);
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
