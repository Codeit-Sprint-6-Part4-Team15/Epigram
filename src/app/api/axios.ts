import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

const ACCESS_TOKKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJ0ZWFtSWQiOiI2LTE1Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI4NTUwMDYsImV4cCI6MTcyMjg1NjgwNiwiaXNzIjoic3AtZXBpZ3JhbSJ9.BARmvaxbGEHR9ityl2x-DjIgaRm_NrXLJfZzU346DeA";
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