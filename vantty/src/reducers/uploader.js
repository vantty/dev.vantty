import {
  IMAGES_UPLOAD_SUCCESS,
  IMAGES_UPLOAD_FAIL,
  IMAGES_UPLOADING,
  IMAGES_DELETE_SUCCESS,
  IMAGES_DELETE_FAIL,
  GET_IMAGES,
  CLEAR_IMAGES
} from "../actions/types";

const initialState = {
  images: null,
  uploading: false,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
        uploading: false,
        loading: false
      };
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
    case CLEAR_IMAGES:
      return {
        images: null,
        uploading: false,
        loading: true
      };
    default:
      return state;
  }
}

// import {
//   GET_REVIEW,
//   REVIEW_ERROR,
//   ADD_COMMENT,
//   REMOVE_COMMENT
// } from "../actions/types";

// const initialState = {
//   review: null,
//   loading: true,
//   error: {}
// };

// export default function(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case GET_REVIEW:
//       return {
//         ...state,
//         review: payload,
//         loading: false
//       };

//     case REVIEW_ERROR:
//       return {
//         ...state,
//         error: payload,
//         loading: false
//       };
//     case ADD_COMMENT:
//       return {
//         ...state,
//         review: { ...state.review, comments: payload },
//         loading: false
//       };
//     case REMOVE_COMMENT:
//       return {
//         ...state,
//         review: {
//           ...state.review,
//           comments: state.review.comments.filter(
//             comment => comment._id !== payload
//           )
//         },
//         loading: false
//       };
//     default:
//       return state;
//   }
// }
