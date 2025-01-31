import axios from "axios";

// For all
export const elastic = axios.create({
  baseURL: process.env.REACT_APP_ELASTIC_BASE_URL
});

export const server = axios.create({
  baseURL: process.env.REACT_APP_NOW_BASE_URL
});

export const API_URL = process.env.REACT_APP_NOW_API_URL;
