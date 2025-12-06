import axios, { AxiosInstance, AxiosResponse } from "axios";

// Simple API client setup
const mockClient: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
mockClient.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
mockClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access - Auth Api ");
      // Clear token and redirect to login on unauthorized
      //   if (typeof window !== "undefined") {
      //     localStorage.removeItem("auth_token");
      //     window.location.href = "/login";
      //   }
    }
    return Promise.reject(error);
  }
);

export default mockClient;
