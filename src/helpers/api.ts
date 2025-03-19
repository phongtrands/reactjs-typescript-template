import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const handleApiError = (error: AxiosError) => {
    if (error.response) {
      console.error('API Error: ', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('No response from server');
      return Promise.reject('No response from server');
    } else {
      console.error('Error during API call: ', error.message);
      return Promise.reject(error.message);
    }
  };
  
  const api = {
    get: <T>(url: string, params?: object): Promise<T> =>
      axiosInstance
        .get(url, { params })
        .then((response: AxiosResponse<T>) => response.data)
        .catch(handleApiError),
  
    post: <T>(url: string, data: object): Promise<T> =>
      axiosInstance
        .post(url, data)
        .then((response: AxiosResponse<T>) => response.data)
        .catch(handleApiError),
  
    put: <T>(url: string, data: object): Promise<T> =>
      axiosInstance
        .put(url, data)
        .then((response: AxiosResponse<T>) => response.data)
        .catch(handleApiError),
  
    delete: <T>(url: string): Promise<T> =>
      axiosInstance
        .delete(url)
        .then((response: AxiosResponse<T>) => response.data)
        .catch(handleApiError),
  };
  
  export default api;