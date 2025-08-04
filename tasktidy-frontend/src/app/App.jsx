// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\app\App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth } from '../features/auth/hooks/useAuth';
import LandingPage from '../features/landing/pages/LandingPage';
import EnhancedDashboardPage from '../features/dashboard/pages/EnhancedDashboardPage';
import AuthPage from '../features/auth/pages/AuthPage';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { ThemeProvider } from '../shared/contexts/ThemeContext';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route 
                path="/" 
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} 
            />
            <Route 
                path="/dashboard" 
                element={isAuthenticated ? <EnhancedDashboardPage /> : <Navigate to="/" />} 
            />
            <Route 
                path="/auth" 
                element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;