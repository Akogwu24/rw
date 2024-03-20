import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { JWT_TOKEN, baseURL } from '../context/AuthContext';

export * from './routes.constants';

// export const baseURL = 'https://fade-api-1675dad1197c.herokuapp.com/api/v1';
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json, text/plain, /*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

const addTokenToRequest = async (req: any) => {
  const token = await AsyncStorage.getItem(JWT_TOKEN);

  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
