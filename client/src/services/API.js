import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5431/",
  timeout: 15000,
});

export default API;
