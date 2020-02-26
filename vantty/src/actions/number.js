import { NUMBER_VERIFY_SUCCESS, NUMBER_VERIFY_FAIL } from "./types";
import axios from "axios";
import crypto from "crypto";

import { createMobileNumber, getCurrentProfile } from "./profile";
import setAlert from "./alert";
import { loadUser } from "./auth";
const appId = process.env.REACT_APP_FACEBOOK_ID;
const appSecret = process.env.REACT_APP_FACEBOOK_APP;

export const verifyNumber = res => async dispatch => {
  const auth_code = res.code;
  // Get Access Token
  axios
    .get(
      `https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=${auth_code}&access_token=AA|${appId}|${appSecret}`
    )
    .then(res => {
      const access_token = res.data.access_token;
      const appsecret_proof = crypto
        .createHmac("sha256", appSecret)
        .update(access_token)
        .digest("hex");

      // GetNumber
      axios
        .get(
          `https://graph.accountkit.com/v1.1/me/?access_token=${access_token}&appsecret_proof=${appsecret_proof}`
        )
        .then(async res => {
          const numberVerified = res.data.phone.number;
          var number = numberVerified.substr(1);
          await dispatch(createMobileNumber({ mobileNumber: number }, true));
          await dispatch(getCurrentProfile());
          await dispatch(loadUser());
          dispatch({
            type: NUMBER_VERIFY_SUCCESS
          });
          dispatch(setAlert("Mobile number validated", "success"));
        })
        .catch(err => {
          dispatch({
            type: NUMBER_VERIFY_FAIL
          });
          dispatch(setAlert("Something went wrong", "error"));
        });
    })
    .catch(err => {
      dispatch({
        type: NUMBER_VERIFY_FAIL
      });
      dispatch(setAlert("Something went wrong", "error"));
    });
};
