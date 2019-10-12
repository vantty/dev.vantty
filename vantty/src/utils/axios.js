// import axios from "axios";

// // For all
// export const elastic = axios.create({
//   baseURL: process.env.REACT_APP_ELASTIC_BASE_URL
// });

// // // Now
// export const server = axios.create({
//   baseURL: process.env.REACT_APP_NOW_BASE_URL
// });
// export const API_URL = process.env.REACT_APP_NOW_API_URL;

// Local;
// export const server = axios.create({
//   baseURL: process.env.REACT_APP_LOCAL_BASE_URL
// });

// export const API_URL = process.env.REACT_APP_LOCAL_API_URL;

import axios from "axios";

// For all
export const elastic = axios.create({
  baseURL: "https://scalr.api.appbase.io/vantty-database/_doc/"
});

// // Now
export const server = axios.create({
  baseURL: "https://apivantty.now.sh/api/"
});
export const API_URL = "https://apivantty.now.sh/api";

// Local;
// export const server = axios.create({
//   baseURL: "http://localhost:5000/api/"
// });

// export const API_URL = "http://localhost:5000/api";
