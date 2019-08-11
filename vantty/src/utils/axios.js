import axios from "axios";

export const server = axios.create({
  baseURL: "https://apivantty.sebashr20.now.sh/api/"
});
