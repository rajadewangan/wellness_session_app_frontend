// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wellness-session-app-backend.onrender.com/api', // Vite will proxy this to http://localhost:5000 if configured
});

// Add Authorization token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token-wellness');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;
