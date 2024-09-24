import axios from 'axios';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('token');

export const axiosIns = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosIns.interceptors.request.use(async (config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
