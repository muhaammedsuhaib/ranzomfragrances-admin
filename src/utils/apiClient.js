import axios from "axios";
import { API_URL } from "./utils";

// 🔐 Token Handlers
export const setLoginToken = (token) => {
  localStorage.setItem("token", token);
};

export const getLoginToken = () => {
  return localStorage.getItem("token");
};

// 🔒 Private Axios Instance (requires token)
const APIClientPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔁 Attach token before each request
APIClientPrivate.interceptors.request.use(
  (config) => {
    const token = getLoginToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🌐 Public Axios Instance (no token needed)
export const APIClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default APIClientPrivate;
