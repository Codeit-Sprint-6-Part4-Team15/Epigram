import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;
// 액세스 토큰을 가져오는 함수 (환경 변수 또는 다른 저장소에서 가져오도록 설정)
// const getToken = () => {
//   return process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
// };

//TODO: access token 수정 필요
const ACCESS_TOKKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjM1MjI5ODMsImV4cCI6MTcyMzUyNDc4MywiaXNzIjoic3AtZXBpZ3JhbSJ9.S7SCAo6DMICxd-tbGE83Vs3n-Gn3MNH6bFiuih2GLZU';
const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKKEN}`,
  },
});

// API layer

instance.interceptors.request.use(
  (config) => {
    const accessToken = ACCESS_TOKKEN; //FIX: token 변경 필요
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
