import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL,
  GET_IMAGES
} from "./types";

import { server, API_URL, elastic } from "../utils/axios";
import {
  getCurrentProfile,
  createProfile,
  loadToElastic
  // tagsToElastic
} from "./profile";
import { loadUser } from "./auth";
import { elasticData } from "../helpers";
import setAlert from "./alert";

// Get Model Image
export const getImages = () => async dispatch => {
  try {
    const res = await server.get(`/images`);

    dispatch({
      type: GET_IMAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IMAGES_UPLOAD_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
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
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const uploadTag = (tagObj, elasticId) => async dispatch => {
  try {
    await server.post("/images/add-tags", [tagObj]);

    const elasticConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: process.env.REACT_APP_ELASTIC_TOKEN
      }
    };
    const datum = { doc: { tag: tagObj.tag } };
    await elastic.post(`/${elasticId}/_update`, datum, elasticConfig);
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = e => async dispatch => {
  const errs = [];
  const files = Array.from(e.target.files);

  if (files.length > 10) {
    const msg = "Only 10 images can be uploaded";
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

  server
    .post("/images/add", formData)
    .then(async res => {
      const images = res.data;
      for (let i = 0; i < images.length; i++) {
        const sendImage = {
          original: images[i].secure_url,
          cloudId: images[i].public_id,
          tag: [""]
        };
        await server.put("/images/portfolio", sendImage);
      }

      await dispatch({
        type: IMAGES_UPLOAD_SUCCESS
        // payload: images
      });
      await dispatch(loadUser());
      await dispatch(getCurrentProfile());

      const resImages = await server.get("/images");
      const resProfile = await server.get("/profile/me");
      const data = elasticData(resImages.data, resProfile); // helpers
      const { profileId } = data[0];
      await loadToElastic(data, resProfile.data.imagesId); //ACTION
      await dispatch(getImages());
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: IMAGES_UPLOAD_FAIL });
    });
};

export const deleteImages = id => async dispatch => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    fetch(`${API_URL}/images/delete`, {
      method: "POST",
      body: formData
    });
    // const resImages = await server.get("/profile/me");
    // const data = elasticData(resImages);
    // const { profileId, elasticId } = data;
    // loadToElastic(data, profileId, elasticId);
    dispatch({ type: IMAGES_DELETE_SUCCESS });
  } catch (err) {
    dispatch({ type: IMAGES_DELETE_FAIL });
  }
};

//Profile Picture
export const userImage = (e, id, profile) => async dispatch => {
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
  server
    .post("/images/add", formData)
    .then(async res => {
      const images = res.data;
      for (let i = 0; i < images.length; i++) {
        var sendImage = {
          original: images[i].secure_url,
          cloudId: images[i].public_id,
          id: id
        };
        await server.put("/auth/user-image", sendImage);
      }

      profile &&
        (await dispatch(
          createProfile({ profilePicture: sendImage.original }, undefined, true)
        ));
      await dispatch({
        type: IMAGES_UPLOAD_SUCCESS
      });
      dispatch(getCurrentProfile());
    })

    .catch(error => {
      console.log(error);
      dispatch({ type: IMAGES_UPLOAD_FAIL });
    });
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
    // const res = await server.delete(`/profile/portfolio/${dataBaseId}`);
    const res = await server.delete(
      `/images/user-pictures/${modelImagesId}/${dataBaseId}`
    );

    await dispatch(deleteImages(cloudId));

    dispatch({
      type: IMAGES_DELETE_SUCCESS,
      payload: res.data
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
