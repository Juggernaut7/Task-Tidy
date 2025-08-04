import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle, 
    Circle, 
    Clock, 
    AlertCircle, 
    MoreVertical, 
    Calendar,
    Tag,
    Target,
    Edit,
    Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../utils/api';

const TaskList = ({ tasks, loading }) => {
    const queryClient = useQueryClient();
    const [selectedTask, setSelectedTask] = useState(null);

    const updateTaskMutation = useMutation({
        mutationFn: async ({ taskId, updates }) => {
            const response = await api.patch(`/tasks/${taskId}`, updates);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        }
    });

    const deleteTaskMutation = useMutation({
        mutationFn: async (taskId) => {
            await api.delete(`/tasks/${taskId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        }
    });

    const handleToggleComplete = (task) => {
        updateTaskMutation.mutate({
            taskId: task._id,
            updates: { completed: !task.completed }
        });
    };

    const handleDelete = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTaskMutation.mutate(taskId);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
            case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
            case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
            case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
            case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
            case 'review': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="p-8 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No tasks found</h3>
                <p className="text-gray-600 dark:text-gray-400">Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Task List</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                </p>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {tasks.map((task, index) => {
                        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
                        
                        return (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${
                                    task.completed ? 'opacity-75' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => handleToggleComplete(task)}
                                        className="flex-shrink-0 mt-1"
                                    >
                                        {task.completed ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>

                                    {/* Task Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className={`font-medium text-gray-900 dark:text-gray-100 ${
                                                    task.completed ? 'line-through' : ''
                                                }`}>
                                                    {task.title}
                                                </h3>
                                                {task.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center space-x-2 ml-4">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setSelectedTask(selectedTask === task._id ? null : task._id)}
                                                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    <AnimatePresence>
                                                        {selectedTask === task._id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.95 }}
                                                                className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedTask(null);
                                                                        // Handle edit
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                    <span>Edit</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedTask(null);
                                                                        handleDelete(task._id);
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Task Meta */}
                                        <div className="flex items-center space-x-4 mt-3">
                                            {/* Priority */}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>

                                            {/* Status */}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>

                                            {/* Category */}
                                            {task.category && (
                                                <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                                                    <Tag className="w-3 h-3" />
                                                    <span>{task.category}</span>
                                                </div>
                                            )}

                                            {/* Due Date */}
                                            {task.dueDate && (
                                                <div className={`flex items-center space-x-1 text-xs ${
                                                    isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                                                    {isOverdue && <AlertCircle className="w-3 h-3" />}
                                                </div>
                                            )}

                                            {/* Progress */}
                                            {task.subtasks && task.subtasks.length > 0 && (
                                                <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                                                    <span>Progress: {task.progress || 0}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskList; 