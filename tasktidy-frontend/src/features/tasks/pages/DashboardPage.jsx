// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\tasks\pages\DashboardPage.jsx
import React from 'react';
import TaskForm from '../components/TaskForm'; // Corrected path
import TaskList from '../components/TaskList'; // Corrected path
import DarkModeToggle from '../../../shared/components/DarkModeToggle'; // Corrected path
import { useAuth } from '../../auth/hooks/useAuth'; // Corrected path
import { motion } from 'framer-motion';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <motion.div
            className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto max-w-2xl lg:max-w-3xl">
                <header className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <h1 className="text-4xl font-bold text-brand-primary-600 dark:text-brand-primary-400">
                        TaskTidy Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <span className="text-lg text-gray-700 dark:text-gray-300 font-medium hidden sm:block">
                                Welcome, <span className="font-semibold text-brand-primary-500 dark:text-brand-primary-300">{user.username}</span>!
                            </span>
                        )}
                        <DarkModeToggle />
                        <motion.button
                            onClick={logout}
                            className="bg-danger text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Logout
                        </motion.button>
                    </div>
                </header>
                <main>
                    <TaskForm />
                    <TaskList />
                </main>
            </div>
        </motion.div>
    );
};

export default DashboardPage;