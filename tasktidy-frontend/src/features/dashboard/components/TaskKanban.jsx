import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
    Plus, 
    MoreVertical, 
    Clock, 
    AlertCircle, 
    CheckCircle, 
    Target,
    Calendar,
    Tag
} from 'lucide-react';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../utils/api';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
            case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
            case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
            default: return 'border-gray-300 bg-gray-50 dark:bg-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'review': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-4 rounded-lg border-2 cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ${
                isDragging ? 'opacity-50 rotate-2' : ''
            } ${getPriorityColor(task.priority)}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm line-clamp-2">{task.title}</h3>
                <div className="flex items-center space-x-1">
                    {isOverdue && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="space-y-2">
                {/* Priority and Status */}
                <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {task.priority}
                    </span>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span className={isOverdue ? 'text-red-600 dark:text-red-400' : ''}>
                            {format(new Date(task.dueDate), 'MMM dd')}
                        </span>
                    </div>
                )}

                {/* Category */}
                {task.category && (
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                        <Tag className="w-3 h-3" />
                        <span>{task.category}</span>
                    </div>
                )}

                {/* Progress */}
                {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{task.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div 
                                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress || 0}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const KanbanColumn = ({ title, tasks, status, onAddTask, onEditTask, onDeleteTask }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            onAddTask(newTaskTitle, status);
            setNewTaskTitle('');
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 min-h-[400px] sm:min-h-[500px]">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{title}</h3>
                <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                    {tasks.length}
                </span>
            </div>

            <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 sm:space-y-3">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <TaskCard
                                    task={task}
                                    onEdit={onEditTask}
                                    onDelete={onDeleteTask}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </SortableContext>

            {/* Add Task Button */}
            <div className="mt-3 sm:mt-4">
                {isAdding ? (
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Enter task title..."
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                            autoFocus
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddTask}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewTaskTitle('');
                                }}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full p-2 sm:p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center space-x-1 sm:space-x-2"
                    >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Add Task</span>
                    </button>
                )}
            </div>
        </div>
    );
};

const TaskKanban = ({ tasks, loading }) => {
    const queryClient = useQueryClient();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns = [
        { id: 'todo', title: 'To Do', status: 'todo' },
        { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
        { id: 'review', title: 'Review', status: 'review' },
        { id: 'completed', title: 'Completed', status: 'completed' }
    ];

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    const updateTaskMutation = useMutation({
        mutationFn: async ({ taskId, updates }) => {
            const response = await api.patch(`/tasks/${taskId}`, updates);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        }
    });

    const createTaskMutation = useMutation({
        mutationFn: async (taskData) => {
            const response = await api.post('/tasks', taskData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        }
    });

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const activeTask = tasks.find(task => task._id === active.id);
            const newStatus = over.id;

            if (activeTask && activeTask.status !== newStatus) {
                updateTaskMutation.mutate({
                    taskId: active.id,
                    updates: { status: newStatus }
                });
            }
        }
    };

    const handleAddTask = (title, status) => {
        createTaskMutation.mutate({
            title,
            status,
            priority: 'medium',
            category: 'General'
        });
    };

    const handleEditTask = (task) => {
        // This would open a modal or form to edit the task
        console.log('Edit task:', task);
    };

    const handleDeleteTask = (task) => {
        // This would show a confirmation dialog and delete the task
        console.log('Delete task:', task);
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Kanban Board</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Drag and drop tasks between columns to update their status
                </p>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {columns.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            title={column.title}
                            tasks={getTasksByStatus(column.status)}
                            status={column.status}
                            onAddTask={handleAddTask}
                            onEditTask={handleEditTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default TaskKanban; 