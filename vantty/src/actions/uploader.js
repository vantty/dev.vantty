import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL,
  CREATE_PORTFOLIO_FORM
} from "./types";

import { server } from "../utils/axios";
import { getCurrentProfile } from "./profile";
import { loadUser } from "./auth";

const API_URL = "https://apivantty.now.sh/api";

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

    if (file.size > 500000) {
      errs.push(
        `"${file.name}" is too large, please pick a smaller file (Max. 3MB)`
      );
    }

    formData.append(i, file);
  });

  if (errs.length) {
    dispatch({ type: IMAGES_UPLOAD_FAIL });
    return errs.forEach(err => console.log(err));
  }

  dispatch({ type: IMAGES_UPLOADING });

  fetch(`${API_URL}/images/add`, {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      console.log("Images uploaded");
      return res.json();
    })
    .then(async images => {
      for (let i = 0; i < images.length; i++) {
        const sendImage = {
          original: images[i].secure_url,
          cloudId: images[i].public_id
        };
        await server.put("/profile/portfolio", sendImage);
      }
      await dispatch({
        type: IMAGES_UPLOAD_SUCCESS,
        payload: images
      });
      await dispatch(loadUser());
      await dispatch(getCurrentProfile());
    })
    .catch(err => {
      err.json().then(e => {
        console.log(e.message);
        dispatch({ type: IMAGES_UPLOAD_FAIL });
      });
    });
};

export const deleteImages = id => dispatch => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    fetch(`${API_URL}/images/delete`, {
      method: "POST",
      body: formData
    });
    dispatch({ type: IMAGES_DELETE_SUCCESS });
  } catch (err) {
    dispatch({ type: IMAGES_DELETE_FAIL });
  }
};
