import axios from "axios";

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const http = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});
