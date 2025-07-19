// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\features\tasks\components\TaskList.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../hooks/useTasks'; // Corrected path based on new structure
import TaskItem from './TaskItem'; // Corrected path based on new structure

const TaskList = () => {
    const { tasks, isLoading, isError, error } = useTasks();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCompleted, setFilterCompleted] = useState('all'); // 'all', 'completed', 'active'

    const filteredTasks = tasks?.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterCompleted === 'completed') {
            return matchesSearch && task.completed;
        } else if (filterCompleted === 'active') {
            return matchesSearch && !task.completed;
        }
        return matchesSearch;
    });

    if (isLoading) return <div className="text-center py-8 text-gray-700 dark:text-gray-300 text-lg">Loading tasks...</div>;
    if (isError) return <div className="text-center py-8 text-danger text-lg">Error loading tasks: {error.message}</div>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200"
                />
                <select
                    value={filterCompleted}
                    onChange={(e) => setFilterCompleted(e.target.value)}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors duration-200"
                >
                    <option value="all">All Tasks</option>
                    <option value="active">Active Tasks</option>
                    <option value="completed">Completed Tasks</option>
                </select>
            </div>
            {filteredTasks && filteredTasks.length > 0 ? (
                <ul className="space-y-4">
                    <AnimatePresence>
                        {filteredTasks.map((task) => (
                            <TaskItem key={task._id} task={task} />
                        ))}
                    </AnimatePresence>
                </ul>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4 text-lg">
                    {searchTerm || filterCompleted !== 'all' ? "No matching tasks found." : "No tasks added yet. Let's get productive!"}
                </p>
            )}
        </div>
    );
};

export default TaskList;