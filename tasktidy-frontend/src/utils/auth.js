// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\utils\auth.js
const TOKEN_KEY = 'tasktidy_auth_token';
const USER_KEY = 'tasktidy_user_data';

export const saveAuthData = (token, user = { username: 'Guest' }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getAuthUser = () => {
    const userData = localStorage.getItem(USER_KEY);
    try {
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        return null;
    }
};

export const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};