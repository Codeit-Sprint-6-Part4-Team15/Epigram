import { User } from '@/src/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;
// 액세스 토큰을 가져오는 함수 (환경 변수 또는 다른 저장소에서 가져오도록 설정)
// const getToken = () => {
//   return process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
// };

let ACCESS_TOKEN = null;

if (typeof window !== 'undefined') {
  ACCESS_TOKEN = localStorage.getItem('access_token') ?? null;
}

//TODO: access token 수정 필요
// const ACCESS_TOKKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzY3LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzIzNDYwMDQyLCJleHAiOjE3MjQwNjQ4NDIsImlzcyI6InNwLWVwaWdyYW0ifQ.ApE2X1ZSVMMNeHdQkXKgq95q8O4wIQPcxDdmJde-G2A'


  const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// API layer

instance.interceptors.request.use(
  (config) => {
    const accessToken = ACCESS_TOKEN; //FIX: token 변경 필요
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
