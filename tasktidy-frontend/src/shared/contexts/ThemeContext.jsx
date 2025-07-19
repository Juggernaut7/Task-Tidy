// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\shared\contexts\ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize dark mode state from localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') { // Ensure localStorage is available
            if (localStorage.theme === 'dark') {
                return true;
            }
            // Check system preference if no theme is explicitly set in localStorage
            if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return true;
            }
        }
        return false;
    });

    // Effect to apply/remove 'dark' class on <html> element
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);