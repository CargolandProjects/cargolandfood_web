import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { API_ROUTES } from "./endpoints";

// Simple API client setup
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
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

// Minimal refresh-on-401 with single-flight and retry
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config || {};

    const data = error?.response?.data as
      | { statusCode?: number; code?: string; message?: string }
      | undefined;

    const normalized = new Error(
      data?.message || error.message || "Something went wrong"
    ) as Error & { statusCode?: number; code?: string;};
    normalized.statusCode = data?.statusCode ?? error.response?.status;
    normalized.code = data?.code;
    normalized.cause = error; // keep original │                                                                               │

    if (status === 401 && !originalRequest._retry) {
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh_token")
          : null;
      if (!refreshToken) {
        // No refresh token; treat as logged out
        return Promise.reject(normalized);
      }

      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = apiClient
            .post(API_ROUTES.auth.refresh, { refreshToken })
            .then((res) => {
              // Expecting { token: { accessToken, refreshToken } }
              const tokens = res?.data?.token;
              const newAccess = tokens?.accessToken;
              const newRefresh = tokens?.refreshToken;
              if (newAccess) localStorage.setItem("auth_token", newAccess);
              if (newRefresh) localStorage.setItem("refresh_token", newRefresh);
              return newAccess as string;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        const newAccessToken = await refreshPromise!;
        if (newAccessToken) {
          // Retry original request with new token
          originalRequest.headers = originalRequest.headers || {};
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (
            originalRequest.headers as any
          ).Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (e) {
        // Refresh failed; clear tokens
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
        }
        return Promise.reject(normalized);
      }
    }

    return Promise.reject(normalized);
  }
);

export default apiClient;
