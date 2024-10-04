import axios, {  AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Tạo instance axios  để gọi api
export const apiConfig = axios.create({
  baseURL:baseURL,
  withCredentials: true,
});
apiConfig.defaults.headers.common = {
  'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
};
// Add a request interceptor
apiConfig.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
  }
);

// Hàm xử lý lỗi riêng


// Xử lý yêu cầu thông qua apiHandler

export default apiConfig;