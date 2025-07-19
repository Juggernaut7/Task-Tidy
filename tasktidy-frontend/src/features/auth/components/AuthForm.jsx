// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\auth\components\AuthForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth'; // Corrected path based on new structure

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!username.trim() || !password.trim()) {
            alert('Please enter both username and password.');
            return;
        }

        // --- Simulated Authentication ---
        // In a real application, you would make an API call to your backend here:
        // try {
        //     const response = await api.post(isRegister ? '/register' : '/login', { username, password });
        //     login(response.data.token, response.data.user);
        // } catch (error) {
        //     alert('Authentication failed: ' + (error.response?.data?.message || error.message));
        // }

        // For now, we simulate success and generate dummy data
        console.log(`${isRegister ? 'Registering' : 'Logging in'} with:`, { username, password });
        const dummyToken = `fake-token-${username}-${Date.now()}`;
        const dummyUser = { username: username, email: `${username}@example.com` };

        // Call the login function from AuthContext to set authentication state
        login(dummyToken, dummyUser);
        // AuthContext will handle the re-render which will show the DashboardPage
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        >
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200"
                    required
                    autoComplete="username"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200"
                    required
                    autoComplete={isRegister ? "new-password" : "current-password"}
                />
            </div>

            <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-primary-600 hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isRegister ? 'Register' : 'Login'}
            </motion.button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{' '}
                <span
                    className="font-medium text-brand-primary-600 hover:text-brand-primary-500 cursor-pointer"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Login here" : "Register here"}
                </span>
            </p>
        </motion.form>
    );
};

export default AuthForm;