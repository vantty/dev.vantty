import {
  NUMBER_VERIFY_SUCCESS,
  NUMBER_VERIFY_FAIL
} from "./types";

import axios from "axios";
import crypto from "crypto";

import { createMobileNumber } from "./profile";
//vantty.ca
const appId = process.env.REACT_APP_FACEBOOK_ID;
const appSecret = process.env.REACT_APP_FACEBOOK_APP;

// const version = "v1.1";

export const verifyNumber = res => dispatch => {
  const auth_code = res.code;
  // Get Access Token
  axios.get(`https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=${auth_code}&access_token=AA|${appId}|${appSecret}`)
    .then(res => {
      const access_token = res.data.access_token;
      const appsecret_proof = crypto
        .createHmac("sha256", appSecret)
        .update(access_token)
        .digest("hex");

      // GetNumber
      axios.get(`https://graph.accountkit.com/v1.1/me/?access_token=${access_token}&appsecret_proof=${appsecret_proof}`)
        .then(res => {
          const numberVerified = res.data.phone.number;
          if (numberVerified !== "") {
            window.location.href =
              "https://vantty.ca/" || "https://www.vantty.ca/";
          }
          dispatch(createMobileNumber({ mobileNumber: numberVerified }, true));

          dispatch({
            type: NUMBER_VERIFY_SUCCESS,
            payload: numberVerified
          });
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
