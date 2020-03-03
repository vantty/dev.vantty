import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL,
  GET_IMAGES
} from "./types";

import { server, elastic } from "../utils/axios";
import { getCurrentProfile, loadToElastic } from "./profile";
import { loadUser } from "./auth";
import { elasticData, updatePropertiesAppbase } from "../helpers";
import setAlert from "./alert";

// Get Model Image
export const getImages = () => async dispatch => {
  try {
    const res = await server.get("/images");

    dispatch({
      type: GET_IMAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IMAGES_UPLOAD_FAIL,
      payload: null
    });
  }
};

// Get Images By ID
export const getImagesById = imagesId => async dispatch => {
  try {
    const res = await server.get(`/images/${imagesId}`);
    dispatch({
      type: GET_IMAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IMAGES_UPLOAD_FAIL,
      payload: null
    });
  }
};

export const uploadImages = e => async dispatch => {
  try {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      const msg = "Only 5 images can be uploaded at a time";
      dispatch({ type: IMAGES_UPLOAD_FAIL });
      return dispatch(setAlert(msg, "warning"));
    }

    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];
    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`"${file.type}" is not a supported format`);
      }
      const maxFileSize = 5 * 1000 * 1000; // 5MB
      if (file.size > maxFileSize) {
        errs.push(
          `"${file.name}" is too large, please pick a smaller file (Max. 5MB)`
        );
      }
      formData.append(i, file);
    });
    if (errs.length) {
      dispatch({ type: IMAGES_UPLOAD_FAIL });
      return errs.forEach(err => dispatch(setAlert(err, "warning")));
    }

    dispatch({ type: IMAGES_UPLOADING });
    await server.post("/images", formData);

    await dispatch(loadUser());
    await dispatch(getCurrentProfile());
    const resImages = await server.get("/images");
    const resProfile = await server.get("/profile/me");
    const data = elasticData(resImages.data, resProfile);

    await loadToElastic(data, resProfile.data.imagesId);
    await dispatch(getImages());
  } catch (error) {
    console.log(error);
    dispatch({ type: IMAGES_UPLOAD_FAIL });
  }
};

export const uploadTag = tagObj => async dispatch => {
  try {
    const keys = Object.keys(tagObj);
    for (const y of keys) {
      for (const x of [tagObj[y]]) {
        var newObjTag = { _id: x._id, tag: x.tag };

        await server.post("/images/tags", [newObjTag]);

        //elastic Tags
        const elasticConfig = {
          headers: {
            "Content-type": "application/json",
            Authorization: process.env.REACT_APP_ELASTIC_TOKEN
          }
        };
        const datum = { doc: { tag: x.tag } };
        await elastic.post(`/${x.elastic}/_update`, datum, elasticConfig);
        await dispatch(getImages());
      }
    }
    const {
      data: { user: userId, profileImage: original }
    } = await server.get("/profile/me");
    await uploadProfileImageToAppbase(userId, original);
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImageToAppbase = async (id, url) => {
  try {
    await updatePropertiesAppbase(id, "profilePicture", url);
  } catch (error) {
    console.log(error);
  }
};

export const deleteImages = imageId => async dispatch => {
  try {
    await server.delete(`/images/delete/${imageId}`);

    dispatch({ type: IMAGES_DELETE_SUCCESS });
  } catch (err) {
    dispatch({ type: IMAGES_DELETE_FAIL });
  }
};

// Delete picture
export const deletePicture = (
  modelImagesId, // model pictures' id
  dataBaseId, // picture's id
  cloudId,
  elasticId
) => async dispatch => {
  try {
    await deleteFromElastic(elasticId);
    const res = await server.delete(`/images/delete/${dataBaseId}/${cloudId}`);
    dispatch({
      type: IMAGES_DELETE_SUCCESS,
      payload: res.data.pictures
    });

    dispatch(setAlert("Picture Removed", "success"));
  } catch (err) {
    dispatch({
      type: IMAGES_UPLOAD_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
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

//Profile Picture
export const userImage = (e, id, profile, removeCloudId) => async dispatch => {
  try {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      const msg = "Only 1 images can be uploaded";
      dispatch({ type: IMAGES_UPLOAD_FAIL });
      return console.log(msg);
    }
    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`"${file.type}" is not a supported format`);
      }

      const maxFileSize = 5 * 1000 * 1000; // 7MB
      if (file.size > maxFileSize) {
        errs.push(
          `"${file.name}" is too large, please pick a smaller file (Max. 7MB)`
        );
      }

      formData.append(i, file);
    });

    if (errs.length) {
      dispatch({ type: IMAGES_UPLOAD_FAIL });
      return errs.forEach(err => console.log(err));
    }

    dispatch({ type: IMAGES_UPLOADING });
    const {
      data: {
        profileImage: { original }
      }
    } = await server.post(`/images/profile/${removeCloudId}`, formData);
    if (profile) await updatePropertiesAppbase(id, "profilePicture", original);
    await dispatch(loadUser());
    await dispatch(getCurrentProfile());
    dispatch({ type: IMAGES_UPLOAD_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: IMAGES_UPLOAD_FAIL });
  }
};

export const updateAndCreateElastic = (
  ealsticId,
  field,
  value
) => async dispatch => {
  try {
    const elasticConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: process.env.REACT_APP_ELASTIC_TOKEN
      }
    };
    const datum = { doc: { [field]: value } };
    await elastic.post(`/${ealsticId}/_update`, datum, elasticConfig);
  } catch (error) {
    console.log(error);
  }
};
