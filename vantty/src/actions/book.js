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
  DELETE_CARD_SUCCESS,
  CHANGE_STATE_BOOKING,
  CHANGE_STATE_BOOKING_SUCCESS,
  CHANGE_STATE_BOOKING_FAIL,
  COMPLETE_SERVICE,
  COMPLETE_SERVICE_SUCCESS,
  COMPLETE_SERVICE_FAIL,
  CLEAR_BOOK,
  GET_BOOK,
  SERVICE_SUCCESS,
  CLEAR_CART,
  ADD_BOOKINGS,
  SAVE_USER_NUMBER_SUCCESS
} from "./types";
import { getCurrentProfile } from "./profile";
import { server } from "../utils/axios";

import setAlert from "./alert";
import { loadUser } from "./auth";
import { gaEvent } from "../marketing/gAnalytics";

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

// Add Card Stripe
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
    const errors = error.response.data.message;
    dispatch(setAlert(errors, "error"));
    dispatch({
      type: ADD_CARD_FAIL
    });
  }
};

// Delete Card Stripe
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

export const loadService = services => async dispatch => {
  try {
    dispatch({
      type: SERVICE_SUCCESS,
      payload: services
    });
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

// Get Bookings User
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
  } catch (error) {
    console.log(error);
  }
};

// Add Book
export const addNewBook = (
  bookId,
  stripeArtistAccount,
  bookCode,
  formData,
  address,
  artistName
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
      requestTimeStamp: today.getTime(),
      bookCode: bookCode,
      stripeCustomerId: stripeCustomerId,
      stripeArtistAccount: stripeArtistAccount,
      artistName: artistName
    };
    await dispatch({ type: ADD_BOOK });
    const res = await server.post(`/book/create-book/${bookId}`, body, config);
    await dispatch({ type: ADD_BOOK_SUCCESS });
    const userUpdated = await server.patch(
      "/user",
      { mobileNumber: body.userPhone },
      "$set"
    );
    await dispatch({
      type: SAVE_USER_NUMBER_SUCCESS,
      payload: userUpdated.data
    });
    await dispatch({
      type: CLEAR_BOOK
    });
    await dispatch({
      type: CLEAR_CART
    });
    dispatch(setAlert("Request Sent", "success"));
    const bookingId = res.data[0]._id;
    const serviceValue = res.data[0].totalValue;
    await gaEvent("New Booking", "Create", bookingId, serviceValue);
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_BOOK_FAIL });
  }
};

// Change State Bookings
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
    await dispatch({ type: CHANGE_STATE_BOOKING });
    await server.post(`/book/booking/${bookingId}`, formData);
    if (byUser) {
      const {
        data: { _id }
      } = await server.get("/user");
      await dispatch(getUserBookings(_id));
    } else {
      await dispatch(getBook());
    }
    await dispatch({ type: CHANGE_STATE_BOOKING_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: CHANGE_STATE_BOOKING_FAIL });
  }
};

export const completeService = bookCode => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await dispatch({ type: COMPLETE_SERVICE });
    await server.post(`/book/complete/${bookCode}`, config);
    await dispatch(getBook());
    await dispatch({ type: COMPLETE_SERVICE_SUCCESS });
  } catch (error) {
    const errors = error.response.data.message;
    dispatch(setAlert(errors, "error"));
    dispatch({ type: COMPLETE_SERVICE_FAIL });
  }
};
