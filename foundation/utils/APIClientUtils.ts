import axios, { AxiosInstance } from "axios";
import { config } from "../../config";

type APIClientOptions = {};

export type APIClient = AxiosInstance;

/**
 * Factory for api client
 */
export function createAPIClient({}: APIClientOptions = {}): APIClient {
  const apiClient = axios.create({
    baseURL: config.get("API_URL"),
    timeout: config.get("API_TIMEOUT"),
  });

  /**
   * Request
   */
  apiClient.interceptors.request.use((request) => {
    const headers = request.headers != null ? request.headers : {};
    const params = request.params != null ? request.params : {};

    request.headers = headers;
    request.params = params;

    return request;
  });

  /**
   * Response
   */
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response || error),
  );

  return apiClient;
}
