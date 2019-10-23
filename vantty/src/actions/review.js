import { server } from "../utils/axios";
import setAlert from "./alert";
import { GET_REVIEW, REVIEW_ERROR, ADD_COMMENT, REMOVE_COMMENT } from "./types";

// Get Review
export const getReview = reviewId => async dispatch => {
  try {
    const res = await server.get(`/review/${reviewId}`);
    dispatch({
      type: GET_REVIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (reviewId, formData) => async dispatch => {
  console.log(formData);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await server.post(
      `/review/comment/${reviewId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (reviewId, commentId) => async dispatch => {
  try {
    await server.delete(`/review/comment/${reviewId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
