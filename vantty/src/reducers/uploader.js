import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL
} from "../actions/types";

const initialState = {
  uploading: false,
  images: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IMAGES_UPLOADING:
      return {
        ...state,
        uploading: true
      };
    case IMAGES_UPLOAD_SUCCESS:
    case IMAGES_DELETE_SUCCESS:
      return {
        ...state,
        uploading: false,
        images: payload
      };
    case IMAGES_UPLOAD_FAIL:
    case IMAGES_DELETE_FAIL:
      return {
        ...state,
        uploading: false
      };
    default:
      return state;
  }
}
