// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\auth\contexts\AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveAuthData, getAuthToken, getAuthUser, removeAuthData, isAuthenticated as checkIsAuthenticated } from '../../../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To prevent flashing unauthenticated content

    useEffect(() => {
        // On mount, check if user is already authenticated (e.g., on page refresh)
        if (checkIsAuthenticated()) {
            setIsAuthenticated(true);
            setUser(getAuthUser());
        }
        setLoading(false); // Authentication check is complete
    }, []);

    const login = (token, userData) => {
        saveAuthData(token, userData);
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        removeAuthData();
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) {
        // Optional: Render a loading spinner or placeholder while checking auth status
        // This prevents the page from briefly showing unauthenticated content then redirecting
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <p>Loading authentication...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);