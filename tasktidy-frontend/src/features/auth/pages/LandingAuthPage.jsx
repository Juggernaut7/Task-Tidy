// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\auth\pages\LandingAuthPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm'; // Corrected path
import LottieAnimation from '../../../shared/components/LottieAnimation'; // Corrected path
import DarkModeToggle from '../../../shared/components/DarkModeToggle'; // Corrected path
import { motion } from 'framer-motion';

// Import your Lottie animation JSON file from the public directory
// Ensure the filename matches what you have in public/lottie/
import taskAnimationData from '../../../assets/lottie/task_animation.json';

const LandingAuthPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 relative overflow-hidden">
            {/* Dark Mode Toggle Positioned */}
            <div className="absolute top-4 right-4 z-10">
                <DarkModeToggle />
            </div>

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl py-12">
                {/* Left/Top Section: Marketing Content & Lottie Animation */}
                <motion.div
                    className="flex-1 flex flex-col items-center justify-center p-6 text-center md:text-left md:items-start"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-7xl font-extrabold text-brand-primary-700 dark:text-brand-primary-400 mb-6 tracking-tight leading-tight drop-shadow-lg">
                        TaskTidy
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                        Your intuitive personal task manager. Streamline your day, boost productivity, and conquer your to-do list with ease.
                    </p>
                    <motion.div
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md my-8 drop-shadow-xl"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Ensure your Lottie JSON path is correct here.
                            It typically starts with a leading slash for files in the `public` directory. */}
                        <LottieAnimation animationData={taskAnimationData} />
                    </motion.div>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        Get started now and transform your workflow.
                    </p>
                </motion.div>

                {/* Right/Bottom Section: Auth Form */}
                <motion.div
                    className="flex-1 w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold text-center text-brand-primary-600 dark:text-brand-primary-400 mb-8">
                        Join TaskTidy Today
                    </h2>
                    <AuthForm />
                </motion.div>
            </div>
        </div>
    );
};

export default LandingAuthPage;