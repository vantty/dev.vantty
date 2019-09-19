import axios from "axios";

export const server = axios.create({
  baseURL: "https://apivantty.now.sh/api/"
});

export const API_URL = "https://apivantty.now.sh/api";

//Local
export const elastic = axios.create({
  baseURL: "https://scalr.api.appbase.io/vantty-database/_doc/"
});

// export const server = axios.create({
//   baseURL: "http://localhost:5000/api/"
// });

// export const API_URL = "http://localhost:5000/api";
