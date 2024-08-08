import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;
// 액세스 토큰을 가져오는 함수 (환경 변수 또는 다른 저장소에서 가져오도록 설정)
// const getToken = () => {
//   return process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
// };

//TODO: access token 수정 필요
const ACCESS_TOKKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzY4LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJyZWZyZXNoIiwiaWF0IjoxNzIzMDA2ODcxLCJleHAiOjE3MjM2MTE2NzEsImlzcyI6InNwLWVwaWdyYW0ifQ.Nr88SO392Uo_vSbF2dgg84k3HJpupCpoATmzApFSlKY';
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
