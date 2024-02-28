import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';

export const BASE_URL: string = 'https://dummyjson.com';

const customAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.timeout = 5000;
    config.timeoutErrorMessage = 'Timeout Error';

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (config.data && typeof config.data === 'object') {
      config.headers['Content-Type'] = 'application/json';
    }

    config.headers.accept = 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  response => {
    return response;
  } /** We are processing from error also so disabled error from response and used in catch blocks */,
  async error => {
    if (error.response.status == 401) {
      console.log('onSessionExpire ==> ');
    }
    return Promise.reject(error);
  },
);

export default customAxios;
