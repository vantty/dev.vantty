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
  INFO_UPDATE_FAIL
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
    console.log(res.data);
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

    dispatch({
      type: INFO_UPDATE_SUCCESS
    });

    dispatch(setAlert(edit && "User Update", "success"));

    // if (edit) {
    //   history.push("/dashboard");
    // }
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
    // const errors = err.response.data.errors;
    // console.log(errors);
    // if (errors) {
    //   errors.forEach(error => {
    //     dispatch(setAlert(error.msg, "error"));
    //   });
    // }
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

// Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export const deleteUserPicture = (dataBaseId, cloudId) => async dispatch => {
  console.log(dataBaseId, cloudId);
  try {
    // const res = await server.post(`/auth/userPicture`, dataBaseId);
    dispatch(
      updateInfo({ id: dataBaseId, profilePicture: "" }, undefined, true)
    );
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
