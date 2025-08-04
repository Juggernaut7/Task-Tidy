// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\auth\components\AuthForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../../../utils/api';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        if (isRegister && !email.trim()) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const data = isRegister 
                ? { username, email, password }
                : { email: username, password }; // For login, use username as email

            const response = await api.post(endpoint, data);
            
            // Call the login function from AuthContext to set authentication state
            login(response.data.token, response.data.user);
            
        } catch (error) {
            console.error('Authentication error:', error);
            setError(error.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        >
            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm"
                >
                    {error}
                </motion.div>
            )}

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isRegister ? 'Username' : 'Email'}
                </label>
                <input
                    type={isRegister ? 'text' : 'email'}
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                    autoComplete="username"
                    placeholder={isRegister ? 'Enter username' : 'Enter email'}
                />
            </div>

            {isRegister && (
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                        autoComplete="email"
                        placeholder="Enter email address"
                    />
                </div>
            )}

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    placeholder="Enter password"
                />
            </div>

            <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
            >
                {loading ? (
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
                    </div>
                ) : (
                    isRegister ? 'Create Account' : 'Sign In'
                )}
            </motion.button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{' '}
                <span
                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError('');
                        setUsername('');
                        setEmail('');
                        setPassword('');
                    }}
                >
                    {isRegister ? "Sign in here" : "Create account"}
                </span>
            </p>
        </motion.form>
    );
};

export default AuthForm;