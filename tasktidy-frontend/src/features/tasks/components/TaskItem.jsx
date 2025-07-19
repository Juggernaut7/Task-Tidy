// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\tasks\components\TaskItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '../hooks/useTasks'; // Corrected path based on new structure

const TaskItem = ({ task }) => {
    const { deleteTask, updateTaskCompletion } = useTasks();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
            deleteTask(task._id);
        }
    };

    const handleToggleComplete = () => {
        updateTaskCompletion({ id: task._id, completed: !task.completed });
    };

    return (
        <motion.li
            // ... (layout and classNames) ...
        >
            {/* Task Title & Description */}
            <div className="flex-1 mr-4 cursor-pointer" onClick={handleToggleComplete}>
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {task.title}
                </h3>
                {task.description && (
                    <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        {task.description}
                    </p>
                )}
            </div>

            {/* Action Buttons: Toggle Complete and Delete */}
            <div className="flex space-x-2">
                {/* Toggle Complete Button */}
                <motion.button
                    onClick={handleToggleComplete}
                    className={`p-2 rounded-full ${task.completed ? 'bg-brand-accent-500 hover:bg-brand-accent-600' : 'bg-brand-secondary-500 hover:bg-brand-secondary-600'} text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${task.completed ? 'brand-accent' : 'brand-secondary'}-500`}
                    title={task.completed ? "Mark as Active" : "Mark as Complete"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {task.completed ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    )}
                </motion.button>

                {/* DELETE Button */}
                <motion.button
                    onClick={handleDelete}
                    // This is the button you're referring to:
                    className="p-2 rounded-full bg-danger text-white hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger"
                    title="Delete Task"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </motion.button>
            </div>
        </motion.li>
    );
};

export default TaskItem;