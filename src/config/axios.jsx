import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const clientServer = axios.create({
  baseURL: BASE_URL ,
  
  withCredentials: true,
  
});

// 🔐 Add token automatically for all requests
clientServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
