import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    List, 
    Grid3X3, 
    Calendar, 
    BarChart3, 
    Plus, 
    Search, 
    Filter,
    MoreVertical,
    Clock,
    Target,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import api from '../../../utils/api';
import DarkModeToggle from '../../../shared/components/DarkModeToggle';
import { useAuth } from '../../auth/hooks/useAuth';
import TaskList from '../components/TaskList';
import TaskKanban from '../components/TaskKanban';
import TaskCalendar from '../components/TaskCalendar';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import QuickActions from '../components/QuickActions';

const EnhancedDashboardPage = () => {
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const [currentView, setCurrentView] = useState('list');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        category: '',
        search: '',
        dueDate: ''
    });

    // Fetch tasks
    const { data: tasksData, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            const response = await api.get('/tasks', { params });
            return response.data;
        }
    });

    // Fetch analytics
    const { data: analytics, isLoading: analyticsLoading } = useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const response = await api.get('/analytics');
            return response.data;
        }
    });

    const tasks = tasksData?.tasks || [];
    const pagination = tasksData?.pagination;

    const views = [
        { id: 'list', name: 'List', icon: List },
        { id: 'kanban', name: 'Kanban', icon: Grid3X3 },
        { id: 'calendar', name: 'Calendar', icon: Calendar },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 }
    ];

    const quickStats = [
        {
            title: 'Total Tasks',
            value: analytics?.totalTasks || 0,
            icon: Target,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900'
        },
        {
            title: 'Completed Today',
            value: analytics?.completedToday || 0,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900'
        },
        {
            title: 'Overdue',
            value: analytics?.overdueTasks || 0,
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900'
        },
        {
            title: 'Due Today',
            value: analytics?.todaysTasks || 0,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900'
        }
    ];

    const renderView = () => {
        switch (currentView) {
            case 'list':
                return <TaskList tasks={tasks} loading={tasksLoading} />;
            case 'kanban':
                return <TaskKanban tasks={tasks} loading={tasksLoading} />;
            case 'calendar':
                return <TaskCalendar tasks={tasks} loading={tasksLoading} />;
            case 'analytics':
                return <AnalyticsDashboard analytics={analytics} loading={analyticsLoading} />;
            default:
                return <TaskList tasks={tasks} loading={tasksLoading} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs sm:text-sm">T</span>
                                </div>
                                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    TaskTidy
                                </h1>
                            </div>
                            {user && (
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                                    Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.username}</span>!
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <DarkModeToggle />
                            <motion.button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-4 sm:py-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {quickStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                                    <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                    <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
                    <div className="flex flex-col space-y-4">
                        {/* View Toggle */}
                        <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
                            {views.map((view) => (
                                <motion.button
                                    key={view.id}
                                    onClick={() => setCurrentView(view.id)}
                                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                                        currentView === view.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <view.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:block">{view.name}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm"
                                />
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <motion.button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                                        showFilters
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:block">Filters</span>
                                </motion.button>

                                <motion.button
                                    onClick={() => setShowTaskForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:block">New Task</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                            >
                                <TaskFilters filters={filters} setFilters={setFilters} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Quick Actions */}
                <QuickActions />

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderView()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Task Form Modal */}
            <AnimatePresence>
                {showTaskForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setShowTaskForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Create New Task</h2>
                                    <button
                                        onClick={() => setShowTaskForm(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <TaskForm onClose={() => setShowTaskForm(false)} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EnhancedDashboardPage; 