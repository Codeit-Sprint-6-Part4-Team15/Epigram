import { User } from '@/src/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

// 액세스 토큰을 가져오는 함수 (환경 변수 또는 다른 저장소에서 가져오도록 설정)
const getToken = () => {
  return (
    localStorage.getItem('access_token') ||
    process.env.NEXT_PUBLIC_ACCESS_TOKEN ||
    ''
  );
};

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
