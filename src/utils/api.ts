/* eslint-disable no-duplicate-imports */
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { normalizeNulls } from './array_helpers.util';

interface DataWrapper<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
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
  responseType: 'json' | 'blob' = 'json',
  useTrackPromise: boolean = true,
): Promise<T> => {
  try {
    const response = await (useTrackPromise
      ? trackPromise(axiosInstance.request<DataWrapper<T>>({ method, url, data, params, headers, responseType }))
      : axiosInstance.request<DataWrapper<T>>({ method, url, data, params, headers, responseType }));

    if (responseType === 'blob') {
      return {
        header: response.headers,
        data: response.data,
      } as T;
    }

    return normalizeNulls(response.data?.data);
  } catch (error) {
    console.error(`API Error [${method}] ${url}:`, error);
    throw error;
  }
};

const api = {
  get: <T>(path: string, params?: object, headers?: object, responseType: 'json' | 'blob' = 'json') =>
    request<T>('GET', path, undefined, params, headers, responseType),
  post: <T>(path: string, body: object, headers?: object) => request<T>('POST', path, body, undefined, headers),
  put: <T>(path: string, body: object, headers?: object) => request<T>('PUT', path, body, undefined, headers),
  delete: <T>(path: string, headers?: object) => request<T>('DELETE', path, undefined, undefined, headers),
};

const apiWithoutTrackLoading = {
  get: <T>(path: string, params?: object, headers?: object, responseType: 'json' | 'blob' = 'json') =>
    request<T>('GET', path, undefined, params, headers, responseType),
  post: <T>(path: string, body: object, headers?: object) => request<T>('POST', path, body, undefined, headers),
  put: <T>(path: string, body: object, headers?: object) => request<T>('PUT', path, body, undefined, headers),
  delete: <T>(path: string, headers?: object) => request<T>('DELETE', path, undefined, undefined, headers),
};

export { api, apiWithoutTrackLoading };
