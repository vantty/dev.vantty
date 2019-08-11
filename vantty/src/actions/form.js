import { CREATE_PROFILE_FORM } from "./types";

export const createProfileForm = value => async dispatch => {
  await dispatch({
    type: CREATE_PROFILE_FORM,
    payload: value
  });
};
