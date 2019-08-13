import { NUMBER_VERIFY_SUCCESS, NUMBER_VERIFY_FAIL } from "./types";

import axios from "axios";
import crypto from "crypto";
const appId = "619096385268555";
const appSecret = "736811c32359eacd02377d882ee49d04";
const csfr = "f20825edcc1a0ef2e4a546155119c52c";
const version = "v1.0";

export const verifyNumber = res => dispatch => {
  const auth_code = res.code;
  const getAccessToken = axios
    .get(
      `https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=${auth_code}&access_token=AA|${appId}|${appSecret}`
    )
    .then(res => {
      const access_token = res.data.access_token;
      const appsecret_proof = crypto
        .createHmac("sha256", appSecret)
        .update(access_token)
        .digest("hex");

      const getNumber = axios
        .get(
          `https://graph.accountkit.com/v1.1/me/?access_token=${access_token}&appsecret_proof=${appsecret_proof}`
        )
        .then(res => {
          const numberVerified = res.data.phone.number;
          console.log(numberVerified);
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
