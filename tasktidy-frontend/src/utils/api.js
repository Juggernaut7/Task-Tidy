import axios from 'axios';
import { getAuthToken, removeAuthData } from './auth';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
    // Check if we're in production (deployed on Vercel)
    if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('netlify.app')) {
        return 'https://task-tidy.onrender.com/api';
    }
    
    // Check for environment variable
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // Default to local development
    return 'http://localhost:5000/api';
};

// Create axios instance with base configuration
const api = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable credentials for CORS
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear auth data
            removeAuthData();
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default api; 