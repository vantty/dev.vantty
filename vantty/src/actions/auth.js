import { server } from "../utils/axios";
import setAlert from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  INFO_UPDATE_SUCCESS,
  INFO_UPDATE_FAIL,
  USER_LOCATION
} from "./types";
import { deleteImages } from "./uploader";
import { getCurrentProfile } from "./profile";
import Axios from "axios";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await server.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const sendEmail = ({
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ firstName, lastName, email, password });
  try {
    await server.post("/auth/register", body, config);
  } catch (error) {
    console.log(error);
  }
};

// Confirm Email
export const confirmEmail = token => async dispatch => {
  try {
    await server.get(`/auth/confirmation/${token}`);
    await dispatch(register(token));
  } catch (error) {
    console.log(error);
  }
};

// Register User
export const register = token => async dispatch => {
  try {
    const res = await server.post(`/auth/validated/${token}`);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await server.post("/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(
      setAlert(
        "Invalid Credentials. Please check your email and password",
        "error"
      )
    );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Facebook Register
export const facebookRegister = data => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ access_token: data });
  try {
    const res = await server.post("/auth/facebook", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Google Register
export const googleRegister = data => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ access_token: data });
  try {
    const res = await server.post("/auth/google", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Facebook Login
export const facebookLogin = data => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ access_token: data });
  try {
    const res = await server.post("/auth/facebook", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Google Login
export const googleLogin = data => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ access_token: data });
  try {
    const res = await server.post("/auth/google", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async dispatch => {
  await dispatch({ type: CLEAR_PROFILE });
  await dispatch({ type: LOGOUT });
  if (true) {
    // window.location.href = "http://localhost:3000/";
    window.location.href = "https://vantty.ca/";
  }
};

//Update Personal Info
export const updateInfo = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    const res = await server.post("/auth/update-info", formData, config);
    await dispatch(loadUser());
    dispatch({
      type: INFO_UPDATE_SUCCESS
    });
    dispatch(setAlert(edit && "User Update", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: INFO_UPDATE_FAIL
    });
    dispatch(setAlert("Update Fail", "error"));
  }
};

// Delete User Picture
export const deleteUserPicture = (dataBaseId, cloudId) => async dispatch => {
  try {
    const res = await server.post(`/auth/userPicture`, { dataBaseId });
    dispatch(deleteImages(cloudId));
    dispatch({
      type: INFO_UPDATE_SUCCESS
    });
    dispatch(getCurrentProfile());
    await dispatch(loadUser());
    dispatch(setAlert("Picture Removed", "success"));
  } catch (err) {
    dispatch({
      type: INFO_UPDATE_FAIL
    });
    dispatch(setAlert("Update Fail", "error"));
  }
};

// Get Country
// export const getGeoInfo = () => async dispatch => {
//   Axios.get("https://ipapi.co/json/")
//     .then(response => {
//       var data = response.data;
//       const location = {
//         countryName: data.country_name,
//         countryCode: data.country_calling_code
//       };
//       dispatch({
//         type: USER_LOCATION,
//         payload: data.country_name
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
