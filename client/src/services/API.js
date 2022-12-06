import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5431/",
  timeout: 15000,
});
