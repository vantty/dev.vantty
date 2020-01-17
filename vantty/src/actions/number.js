import { NUMBER_VERIFY_SUCCESS, NUMBER_VERIFY_FAIL } from "./types";
import axios from "axios";
import crypto from "crypto";

import { createMobileNumber, getCurrentProfile } from "./profile";

import { loadUser } from "./auth";
const appId = process.env.REACT_APP_FACEBOOK_ID;
const appSecret = process.env.REACT_APP_FACEBOOK_APP;

// const version = "v1.1";

// const redirect = (numberVerified, id) => {
//   if (numberVerified !== "") {
//     window.location.href = `https://vantty.ca/profile/artist/${id}`;
//   }
// };

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

          await dispatch({
            type: NUMBER_VERIFY_SUCCESS,
            payload: numberVerified
          });
          await dispatch(getCurrentProfile());
          await dispatch(loadUser());

          // await redirect(numberVerified, id);
        })
        .catch(err => {
          dispatch({
            type: NUMBER_VERIFY_FAIL,
            payload: null
          });
        });
    })
    .catch(err => {
      dispatch({
        type: NUMBER_VERIFY_FAIL,
        payload: null
      });
    });
};
