// services/authServices.ts

import axios from 'axios';

const BASE_URL = "https://dev-hcx.swasth.app/api/v0.8";

const makeRequest = (endpoint: string, payload: any, config?: any) => {
  return axios.post(`${BASE_URL}${endpoint}`, payload, config);
};

const login = (credentials: any) => {
  return makeRequest('/participant/auth/token/generate', credentials, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

const sendOTP = (payload: any) => {
  return makeRequest('/participant/auth/send-otp', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const signup = (credentials: any) => {
  return makeRequest('/participant/auth/signup', credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { login, sendOTP, signup };
