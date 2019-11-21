import { server } from "../utils/axios";
import setAlert from "./alert";
import {
  GET_REVIEW,
  REVIEW_ERROR,
  REMOVE_COMMENT,
  ADD_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK
} from "./types";

// Get Review
// export const getReview = reviewId => async dispatch => {
//   try {
//     const res = await server.get(`/review/${reviewId}`);
//     dispatch({
//       type: GET_REVIEW,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: REVIEW_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add comment
export const addNewBook = (reviewId, formData) => async dispatch => {
  console.log(reviewId, formData);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await server.post(
      `/book/create-book/${reviewId}`,
      formData,
      config
    );
    await dispatch({
      type: ADD_BOOK,
      payload: true
    });

    await dispatch({
      type: CLEAR_BOOK
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
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
