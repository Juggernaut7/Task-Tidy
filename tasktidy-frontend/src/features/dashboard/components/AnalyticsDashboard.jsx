import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Area,
    AreaChart
} from 'recharts';
import { 
    TrendingUp, 
    TrendingDown, 
    Target, 
    CheckCircle, 
    Clock, 
    AlertCircle,
    Calendar,
    Users,
    Zap
} from 'lucide-react';

const AnalyticsDashboard = ({ analytics, loading }) => {
    const [timeRange, setTimeRange] = useState('30');

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading analytics...</p>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No analytics data available</p>
            </div>
        );
    }

    // Prepare data for charts
    const completionTrends = analytics.completionTrends || [];
    const priorityDistribution = analytics.priorityDistribution || [];
    const categoryDistribution = analytics.categoryDistribution || [];
    const statusDistribution = analytics.statusDistribution || [];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    const formatChartData = (data, key, value) => {
        return data.map(item => ({
            name: item._id || 'Unknown',
            value: item.count || 0
        }));
    };

    const formatTrendData = (data) => {
        return data.map(item => ({
            date: item._id,
            completed: item.count,
            total: item.count + Math.floor(Math.random() * 5) // Mock data for total
        }));
    };

    const calculateCompletionRate = () => {
        if (!analytics.totalTasks) return 0;
        return Math.round((analytics.completedTasks / analytics.totalTasks) * 100);
    };

    const getTrendIcon = (trend) => {
        if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Target className="w-4 h-4 text-gray-500" />;
    };

    const stats = [
        {
            title: 'Total Tasks',
            value: analytics.totalTasks || 0,
            icon: Target,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900',
            trend: '+12%'
        },
        {
            title: 'Completion Rate',
            value: `${calculateCompletionRate()}%`,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900',
            trend: '+5%'
        },
        {
            title: 'Overdue Tasks',
            value: analytics.overdueTasks || 0,
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900',
            trend: '-8%'
        },
        {
            title: 'Due Today',
            value: analytics.todaysTasks || 0,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900',
            trend: '+3%'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Analytics Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your productivity and task performance
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center space-x-1">
                                {getTrendIcon(stat.trend)}
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Completion Trends */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Completion Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={formatTrendData(completionTrends)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                                dataKey="date" 
                                stroke="#6B7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6B7280"
                                fontSize={12}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#F9FAFB'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="completed" 
                                stroke="#3B82F6" 
                                fill="#3B82F6" 
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Priority Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={formatChartData(priorityDistribution, '_id', 'count')}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {formatChartData(priorityDistribution, '_id', 'count').map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#F9FAFB'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Category Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Category Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatChartData(categoryDistribution, '_id', 'count')}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#6B7280"
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis 
                                stroke="#6B7280"
                                fontSize={12}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#F9FAFB'
                                }}
                            />
                            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Status Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatChartData(statusDistribution, '_id', 'count')}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#6B7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6B7280"
                                fontSize={12}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#F9FAFB'
                                }}
                            />
                            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Insights */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Productivity Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Productivity Up</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">15% increase this week</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">On Track</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">85% of tasks completed</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600" />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Time Management</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Average 2.5 hours per task</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsDashboard; 