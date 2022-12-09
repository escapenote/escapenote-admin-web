import axios from 'axios';
import { Auth } from 'aws-amplify';

import * as cafes from './cafes';
import * as themes from './themes';
import * as images from './images';

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

adminApi.interceptors.request.use(
  async (config: any) => {
    config.headers['Authorization'] =
      'Bearer ' +
      (await Auth.currentSession().then(creds => {
        return creds.getAccessToken().getJwtToken();
      }));
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

const exportedObject = {
  cafes,
  themes,
  images,
};

export default exportedObject;
