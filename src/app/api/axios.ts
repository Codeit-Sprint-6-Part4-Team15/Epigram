import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

const ACCESS_TOKKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI4NTcwNjcsImV4cCI6MTcyMjg1ODg2NywiaXNzIjoic3AtZXBpZ3JhbSJ9.xJPbgO2DPGDDE1RkRU3A5oMZoMKPa_xWkUoEqchmE3g";
const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKKEN}`
  },
});

export default instance;