import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import review from "./review";
import navbar from "./navbar";
import uploader from "./uploader";
import number from "./number";
import search from "./search";
import pay from "./pay";
import cart from "./cart";

export default combineReducers({
  alert,
  auth,
  profile,
  review,
  navbar,
  uploader,
  number,
  search,
  pay,
  cart
});
