import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { API_URL, REQUEST_TIMEOUT } from '../common/constants';
import { getToken } from './token';

const StatusCodeMapping: Record<number, boolean> = {
  0: true, // blocked url
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use((response) => response, (error: AxiosError<{ error: string }>) => {
    if (error.response && shouldDisplayError(error.response)) {
      toast.error(error.response.data?.error ?? 'Request rejected');
    }
    throw error;
  });

  return api;
};
