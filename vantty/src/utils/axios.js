import axios from "axios";

export const server = axios.create({
  baseURL: "https://apivantty.now.sh/api/"
});
