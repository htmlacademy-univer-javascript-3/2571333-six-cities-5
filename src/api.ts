import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
export const saveToken = (token: Token) => localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
export const dropToken = () => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

export interface IErrorMessage {
  type: string;
  message: string;
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<IErrorMessage>) => error.response,
  );

  return api;
};
