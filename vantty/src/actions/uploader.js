import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL
} from "./types";

import { server, API_URL } from "../utils/axios";
import { getCurrentProfile, createProfile, loadToElastic } from "./profile";
import { loadUser } from "./auth";
import { elasticData } from "../helpers";

// export const uploadTag = (tag, pictureId) => async dispatch => {
//   try {
//     const sendTags = { tag, pictureId };
//     server.post("/profile/add-tags", sendTags);
//   } catch (error) {
//     console.log(error);
//   }
// };

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
        await server.put("/profile/portfolio", sendImage);
      }

      await dispatch({
        type: IMAGES_UPLOAD_SUCCESS,
        payload: images
      });
      await dispatch(loadUser());
      await dispatch(getCurrentProfile());

      const resProfile = await server.get("/profile/me");
      const data = elasticData(resProfile);
      const { profileId, elasticId } = data;
      loadToElastic(data, profileId, elasticId);
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
    const resProfile = await server.get("/profile/me");
    const data = elasticData(resProfile);
    const { profileId, elasticId } = data;
    loadToElastic(data, profileId, elasticId);
    dispatch({ type: IMAGES_DELETE_SUCCESS });
  } catch (err) {
    dispatch({ type: IMAGES_DELETE_FAIL });
  }
};

//Profile Picture
export const userImage = (e, id, profile) => async dispatch => {
  console.log(e.target.files);
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
    console.log("formadata", file);
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
      await dispatch(loadUser());
      profile &&
        (await dispatch(
          createProfile({ profilePicture: sendImage.original }, undefined, true)
        ));
      await dispatch({
        type: IMAGES_UPLOAD_SUCCESS,
        payload: images
      });
      await dispatch(getCurrentProfile());
    })

    .catch(error => {
      console.log(error);
      dispatch({ type: IMAGES_UPLOAD_FAIL });
    });
};
