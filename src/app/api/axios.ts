import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

const ACCESS_TOKKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MzIyMzUsImV4cCI6MTcyMjkzNDAzNSwiaXNzIjoic3AtZXBpZ3JhbSJ9.Dk_cZxMzh1o18xiSoVNavr2_adL26U0OQ0mYFXW8fc0';
const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKKEN}`,
  },
});

export default instance;
