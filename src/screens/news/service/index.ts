import axiosInstance, { API_ENDPOITS } from '../../../services/api';
import { newsApiBaseUrl } from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JWT_TOKEN } from '../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export async function getNews(page: string, newsCategory: string) {
  const { data } = await axios.get(`${newsApiBaseUrl}${!newsCategory ? API_ENDPOITS.GET_TODAY_NEWS(page) : API_ENDPOITS.GET_TODAY_NEWS_CATEGORY(newsCategory, page)}`);

  // const { data } = await axios.get(`${newsApiBaseUrl}${API_ENDPOITS.GET_TODAY_NEWS(newsCategory, page)}`);

  return data;
}

async function gettoken() {
  const storedToken = await AsyncStorage.getItem(JWT_TOKEN);
  if (!storedToken) return console.log('no token');
  const decoded = jwtDecode(storedToken);
  const expiryDate = new Date((decoded.exp as number) * 1000);

  console.log('expiryDate', expiryDate);
}
