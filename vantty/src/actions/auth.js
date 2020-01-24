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
  SAVE_CONFIRMATION_EMAIL
} from "./types";
import { deleteImages } from "./uploader";
import { getCurrentProfile } from "./profile";

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
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ firstName, lastName, email, password });
    const res = await server.post("/auth/send", body, config);
    dispatch({
      type: SAVE_CONFIRMATION_EMAIL,
      payload: res.data
    });
  } catch (error) {
    dispatch(
      setAlert(
        "There is an account with the same email address. Try with another method.",
        "warning"
      )
    );
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const resendEmail = user => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await server.post("/auth/resend", user, config);
  } catch (error) {
    console.log(error);
  }
};

// Register User
export const register = token => async dispatch => {
  try {
    const res = await server.get(`/auth/register/${token}`);
    console.log("TOKEN", res.data);
    await dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    await dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
    console.log(error);
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
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await dispatch(loadUser());
  } catch (err) {
    dispatch(
      setAlert(
        "Invalid Credentials; please check your email and password. If everything looks fine, maybe you haven't confirmed your email",
        "error"
      )
    );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Forgot Password
export const forgot = email => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    await server.post("/auth/forgot", email, config);
    await dispatch(
      setAlert(
        "An email has been sent with instructions to reset your password",
        "success"
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
  }
};

// Reset Password
export const reset = (token, password) => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = { token, password };
    await server.post("/auth/reset", body, config);
    await dispatch(
      setAlert("Your password has been successfully changed", "success")
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
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
    dispatch(
      setAlert(
        "There is an account with the same email address. Try with another method.",
        "warning"
      )
    );
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
    dispatch(
      setAlert(
        "There is an account with the same email address. Try with another method.",
        "warning"
      )
    );
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
    dispatch(
      setAlert(
        "There is an account with the same email address. Try with another method.",
        "warning"
      )
    );
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
    dispatch(loadUser());
  } catch (err) {
    dispatch(
      setAlert(
        "There is an account with the same email address. Try with another method.",
        "warning"
      )
    );
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async dispatch => {
  await dispatch({ type: CLEAR_PROFILE });
  await dispatch({ type: LOGOUT });
  // if (true) {
  //   // window.location.href = "http://localhost:3000/";
  //   window.location.href = "https://vantty.ca/";
  // }
};

//Update Personal Info
export const updateInfo = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    await server.post("/auth/update-info", formData, config);
    await dispatch(loadUser());
    dispatch({
      type: INFO_UPDATE_SUCCESS
    });
    // dispatch(loadUser());

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
    await server.post(`/auth/userPicture`, { dataBaseId });
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
