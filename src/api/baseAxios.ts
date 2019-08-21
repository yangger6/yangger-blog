import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import LS from '@/utils/LocalStorage';
const token: {
  Authorization: string;
} = {
  Authorization: '',
};
const initToken = () => {
  setToken(LS.get('USER_TOKEN'));
};
export const setToken = (Authorization: string) => {
  token.Authorization = Authorization;
};
export const getToken = () => {
  return token;
};
initToken();

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.url = `/sapi${config.url}`
    Object.assign(config.headers, getToken());
    return config;
  },
  (error: AxiosError) => {
    console.log(`捕捉到请求错误`);
    console.log(error.message);
  },
);
axios.interceptors.response.use(
  ({ data, status }: AxiosResponse) => {
    // console.log(data)
    if (status !== 200) {
      console.log(`捕捉到回调错误`);
      data.data = data.data || {};
      return data;
    }
    if (data.status === '200' || data.success === true) {
      return data.data;
    } else {
      return Promise.reject(data);
    }
  },
  (error: any) => {
    if (error.response && error.response.status === 404) {
      // console.log('404')
    }
    console.log(error.message);
    return Promise.reject(error);
  },
);
export default axios;
