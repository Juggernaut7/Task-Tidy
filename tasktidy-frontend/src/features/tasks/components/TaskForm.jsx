// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\tasks\components\TaskForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '../hooks/useTasks'; // Corrected path based on new structure

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTask, addTaskStatus } = useTasks(); // Get the mutation status for loading/error feedback

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Task title cannot be empty!');
            return;
        }
        addTask({ title, description }); // Call the mutate function from useMutation
        setTitle('');
        setDescription('');
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task title (e.g., Finish report)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200"
                    disabled={addTaskStatus === 'pending'} // Disable while adding
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Task description (optional, e.g., Prepare slides for team meeting)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200 resize-y"
                    disabled={addTaskStatus === 'pending'} // Disable while adding
                ></textarea>
            </div>
            <motion.button
                type="submit"
                className="w-full bg-brand-primary-600 text-white p-3 rounded-md hover:bg-brand-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={addTaskStatus === 'pending'} // Disable while adding
            >
                {addTaskStatus === 'pending' ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Task...
                    </>
                ) : 'Add Task'}
            </motion.button>
            {addTaskStatus === 'error' && (
                <p className="text-danger text-sm mt-2 text-center">Error adding task. Please try again.</p>
            )}
        </motion.form>
    );
};

export default TaskForm;