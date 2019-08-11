import { server } from "../utils/axios";

const setAuthToken = token => {
  if (token) {
    server.defaults.headers.common["authorization"] = token;
  } else {
    delete server.defaults.headers.common["authorization"];
  }
};

export default setAuthToken;
