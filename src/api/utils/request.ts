import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StubUse } from '../../test/data';

const instance = axios.create({
  timeout: 3000,
});
if (process.env.NODE_ENV === 'test') {
  StubUse(instance);
}
interface AxiosResponseError {
  response: AxiosResponse;
}

interface AxiosResponseTimeout {
  code: 'ECONNABORTED';
  message: string;
}

const isAxiosResponseError = (
  error: AxiosResponseError | AxiosResponseTimeout
): error is AxiosResponseError => {
  return 'response' in error && !!error.response?.status;
};
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosResponseError | AxiosResponseTimeout) => {
    if (isAxiosResponseError(error)) {
      return Promise.resolve({
        code: error.response.status,
        message: error.response.statusText,
      });
    } else {
      return {
        code: 504,
        message: error.message,
      };
    }
  }
);

export interface IResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}
export const get = (
  url: string,
  params?: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse> => {
  return instance.get(url, {
    ...config,
    params,
  });
};

export const post = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse> => instance.post(url, data, config);
