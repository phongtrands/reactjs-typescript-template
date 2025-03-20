import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { trackPromise } from 'react-promise-tracker';

const BASE_URL: string = import.meta.env.BASE_URL;
const DEF_HEADERS: object = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: DEF_HEADERS,
});

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(requestInterceptor);

// Response Interceptor - Handle Global Errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  },
);

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object,
  params?: object,
  headers: object = DEF_HEADERS,
  useTrackPromise: boolean = true,
): Promise<T> => {
  try {
    const response = await (useTrackPromise
      ? trackPromise(axiosInstance.request<T>({ method, url, data, params, headers }))
      : axiosInstance.request<T>({ method, url, data, params, headers }));
    return response.data;
  } catch (error) {
    console.error(`API Error [${method}] ${url}:`, error);
    throw error;
  }
};

const api = {
  get: <T>(path: string, params?: object, headers?: object) => request<T>('GET', path, undefined, params, headers),
  post: <T>(path: string, body: object, headers?: object) => request<T>('POST', path, body, undefined, headers),
  put: <T>(path: string, body: object, headers?: object) => request<T>('PUT', path, body, undefined, headers),
  delete: <T>(path: string, headers?: object) => request<T>('DELETE', path, undefined, undefined, headers),
};

const apiWithoutTrackLoading = {
  get: <T>(path: string, params?: object, headers?: object) =>
    request<T>('GET', path, undefined, params, headers, false),
  post: <T>(path: string, body: object, headers?: object) => request<T>('POST', path, body, undefined, headers, false),
  put: <T>(path: string, body: object, headers?: object) => request<T>('PUT', path, body, undefined, headers, false),
  delete: <T>(path: string, headers?: object) => request<T>('DELETE', path, undefined, undefined, headers, false),
};

export { api, apiWithoutTrackLoading };
