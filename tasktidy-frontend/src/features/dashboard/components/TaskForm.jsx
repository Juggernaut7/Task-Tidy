import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../utils/api';
import { AnimatePresence } from 'framer-motion';

const TaskForm = ({ onClose, task = null }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'medium',
        category: task?.category || 'General',
        status: task?.status || 'todo',
        dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        estimatedTime: task?.estimatedTime || '',
        tags: task?.tags?.join(', ') || '',
        notes: task?.notes || ''
    });

    const createTaskMutation = useMutation({
        mutationFn: async (taskData) => {
            const response = await api.post('/tasks', taskData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            onClose();
        }
    });

    const updateTaskMutation = useMutation({
        mutationFn: async ({ taskId, taskData }) => {
            const response = await api.patch(`/tasks/${taskId}`, taskData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            onClose();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const taskData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : null
        };

        if (task) {
            updateTaskMutation.mutate({ taskId: task._id, taskData });
        } else {
            createTaskMutation.mutate(taskData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="Enter task description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="e.g., Work, Personal"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Estimated Time (minutes)</label>
                    <input
                        type="number"
                        name="estimatedTime"
                        value={formData.estimatedTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="30"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="tag1, tag2, tag3"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                        placeholder="Additional notes..."
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={createTaskMutation.isPending || updateTaskMutation.isPending}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createTaskMutation.isPending || updateTaskMutation.isPending ? (
                        <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {task ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        task ? 'Update Task' : 'Create Task'
                    )}
                </button>
            </div>
        </form>
    );
};

export default TaskForm; 