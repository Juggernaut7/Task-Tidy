import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-sm sm:max-w-md">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 sm:mb-8 transition-colors"
                    whileHover={{ x: -5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Back to Home</span>
                </motion.button>

                {/* Auth Card */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo and Title */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm sm:text-lg">T</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TaskTidy
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Auth Form */}
                    <AuthForm />
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage; 