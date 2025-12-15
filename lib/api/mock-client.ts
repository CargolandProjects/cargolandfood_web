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

    // Prefer backend-standard error payload if available
    const data = error?.response?.data;
    if (
      data &&
      typeof data.statusCode === "number" &&
      typeof data.error === "string"
    ) {
      return Promise.reject(data);
    }

    const backendMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject(new Error(backendMessage));
  }
);

export default mockClient;
