import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API URL,
  timeout: 5000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json", // Set default headers
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if token is provided and attach it to the request if available
    const token = config.token || (config.data && config.data.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
