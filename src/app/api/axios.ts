import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default instance;