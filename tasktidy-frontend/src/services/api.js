// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\services\api.js
import axios from 'axios';
// import { getAuthToken } from '../utils/auth'; // Uncomment if backend requires a token

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://task-tidy-4wgp.vercel.app";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add a request interceptor to include auth tokens if your backend ever needs them
// api.interceptors.request.use(config => {
//     const token = getAuthToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

export default api;