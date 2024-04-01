import axios from "axios";

// Get token from local storage
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // Set default headers
  },
});

// Add a request interceptor to set Authorization header if token exists
instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
