import axios from "axios";

// For all
export const elastic = axios.create({
  baseURL: process.env.REACT_APP_ELASTIC_BASE_URL
});

// // Now
export const server = axios.create({
  baseURL: process.env.REACT_APP_NOW_BASE_URL
  // baseURL: process.env.REACT_APP_LOCAL_BASE_URL
});
export const API_URL = process.env.REACT_APP_NOW_API_URL;
// export const API_URL = process.env.REACT_APP_NOW_LOCAL_API_URL;
