import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar as CalendarIcon,
    Clock,
    AlertCircle
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const TaskCalendar = ({ tasks, loading }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getTasksForDay = (day) => {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            return isSameDay(new Date(task.dueDate), day);
        });
    };

    const getDayClasses = (day) => {
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isToday = isSameDay(day, new Date());
        const dayTasks = getTasksForDay(day);
        const hasOverdueTasks = dayTasks.some(task => new Date(task.dueDate) < new Date() && !task.completed);

        let classes = 'p-2 text-sm border border-gray-200 dark:border-gray-700 min-h-[80px] relative';
        
        if (!isCurrentMonth) {
            classes += ' bg-gray-50 dark:bg-gray-800 text-gray-400';
        } else if (isToday) {
            classes += ' bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600';
        } else {
            classes += ' bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700';
        }

        if (hasOverdueTasks) {
            classes += ' border-red-300 dark:border-red-600';
        }

        return classes;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading calendar...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Calendar View</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    View your tasks by due date
                </p>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {format(currentDate, 'MMMM yyyy')}
                </h3>
                
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {monthDays.map((day, index) => {
                        const dayTasks = getTasksForDay(day);
                        const isOverdue = dayTasks.some(task => new Date(task.dueDate) < new Date() && !task.completed);
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.01 }}
                                className={getDayClasses(day)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`font-medium ${
                                        isSameDay(day, new Date()) ? 'text-blue-600 dark:text-blue-400' : ''
                                    }`}>
                                        {format(day, 'd')}
                                    </span>
                                    {isOverdue && (
                                        <AlertCircle className="w-3 h-3 text-red-500" />
                                    )}
                                </div>

                                {/* Task Indicators */}
                                <div className="space-y-1">
                                    {dayTasks.slice(0, 3).map((task, taskIndex) => (
                                        <div
                                            key={task._id}
                                            className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                                                task.completed 
                                                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                                    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                            }`}
                                            title={task.title}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                                                <span className="truncate">{task.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {dayTasks.length > 3 && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                            +{dayTasks.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Urgent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCalendar; 