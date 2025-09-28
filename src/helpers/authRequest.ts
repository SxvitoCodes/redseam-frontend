import axios, { type AxiosRequestConfig } from "axios";
import { API_URL } from "../config";

export const authRequest = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<T | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await axios({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...config.headers,
    },
    ...config,
  });

  return response.data;
};
