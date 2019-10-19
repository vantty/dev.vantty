import { server, elastic } from "../utils/axios";
import setAlert from "./alert";
import { loadUser } from "./auth";
import { deleteImages } from "./uploader";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETE
} from "./types";

// Get current users profile
export const getCurrentProfile = (owner = true) => async dispatch => {
  !owner && dispatch({ type: CLEAR_PROFILE });
  try {
    // dispatch({ type: GET_PROFILE });
    await dispatch(loadUser());
    const res = await server.get("/profile/me");
    await dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await server.get("/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await server.get(`/profile/artist/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or Update
export const createProfile = (
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
    const res = await server.post("/profile", formData, config);
    dispatch(getCurrentProfile());
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Update" : "Profile Created", "success"));

    // const data = elasticData(res);
    // const { profileId, elasticId } = data;
    // loadToElastic(data, profileId, elasticId);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create Mobile Number
export const createMobileNumber = (
  formData,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    const res = await server.post("/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Mobile Number Validated" : null, "success"));
    dispatch(setAlert(!edit ? "Mobile Number NO Validated" : null, "error"));

    // const data = elasticData(res);
    // const { profileId, elasticId } = data;
    // loadToElastic(data, profileId, elasticId);
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addCategories = (
  state,
  history,
  stateHair,
  edit = false
) => async dispatch => {
  let categories = {};
  let makeup = [];
  let hair = [];

  for (const prop in state) {
    if (state[prop] === true) {
      await makeup.push(prop);
    }
  }

  for (const prop in stateHair) {
    if (stateHair[prop] === true) {
      await hair.push(prop);
    }
  }
  categories = { makeup, hair };

  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await server.put("/profile/categories", categories, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Categories Added", "success"));
    edit && history.push("/settings");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await server.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Account & PROFILE
export const deleteAccount = elastidId => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await deleteFromElastic(elastidId);
      await server.delete("/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETE });

      dispatch(
        setAlert("Your account has been permanantly deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Add Portfolio
export const addPortfolio = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await dispatch(loadUser());
    const res = await server.put("/profile/portfolio", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Pictures Added", "success"));

    history.push("/contact-info");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete picture
export const deletePicture = (
  modelImagesId, // model pictures' id
  dataBaseId, // picture's id
  cloudId,
  elasticId
) => async dispatch => {
  console.log("ACTION", elasticId);
  try {
    await deleteFromElastic(elasticId);
    // const res = await server.delete(`/profile/portfolio/${dataBaseId}`);
    const res = await server.delete(
      `/images/user-pictures/${modelImagesId}/${dataBaseId}`
    );
    await dispatch(deleteImages(cloudId));

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Picture Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteProfilePicture = (dataBaseId, cloudId) => async dispatch => {
  try {
    const res = await server.delete(`/profile/profilePicture/${dataBaseId}`);

    dispatch(deleteImages(cloudId));

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(getCurrentProfile());

    dispatch(setAlert("Picture Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Verified
export const verifiedProfile = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    await server.post("/profile/verified", formData, config);

    dispatch(getProfiles());
    // const data = elasticData(res);
    // const { profileId, elasticId } = data;
    // loadToElastic(data, profileId, elasticId);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Account & PROFILE
export const deleteProfileAndUserDashboard = ({
  formData
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (window.confirm("Are you sure?")) {
    try {
      // await deleteFromElastic(elastidId);
      await server.delete("/profile/profile-user-dashboard", formData);

      // dispatch({ type: CLEAR_PROFILE });
      // dispatch({ type: ACCOUNT_DELETE });

      dispatch(
        setAlert("Your account has been permanantly deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Upload data to elastic
export const loadToElastic = async (data, imagesId) => {
  const elasticConfig = {
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.REACT_APP_ELASTIC_TOKEN
    }
  };

  let allElasticId = [];
  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    if (datum.elasticId == null) {
      const esRes = await elastic.post("/", datum, elasticConfig);
      const elasticId = await esRes.data._id;
      console.log(elasticId);
      await allElasticId.push({
        _id: datum.pictureId,
        elasticId: elasticId,
        tag: datum.tag
      });

      const body = { allElasticId, imagesId };
      await server.put("/profile/elastic", body);
    }
  }

  // if (!elasticId) {
  //   data.map(async datum => {
  //     const esRes = await elastic.post("/", datum, elasticConfig);
  //     console.log(esRes);
  //     picId = await esRes.data.picId;
  //     const body = { picId };
  //     await server.put("/profile/elastic", body);
  //   });
  // } else {
  //   data.map(async datum => {
  //     console.log(datum);
  //     await elastic.put(`/${elasticId}`, datum, elasticConfig);
  //   });
  // }
};

export const tagsToElastic = async data => {
  const elasticConfig = {
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.REACT_APP_ELASTIC_TOKEN
    }
  };
  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    elastic.put(`/${datum.elasticId}`, datum, elasticConfig);
  }
};

const deleteFromElastic = async elasticId => {
  const elasticConfig = {
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.REACT_APP_ELASTIC_TOKEN
    }
  };
  await elastic.delete(`/${elasticId}`, elasticConfig);
};
