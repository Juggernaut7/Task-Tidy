import React from 'react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    Clock, 
    Target, 
    Calendar,
    Zap,
    Download,
    Upload
} from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            icon: Plus,
            title: 'Quick Add',
            description: 'Add a task in seconds',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900'
        },
        {
            icon: Clock,
            title: 'Due Today',
            description: 'View today\'s tasks',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900'
        },
        {
            icon: Target,
            title: 'High Priority',
            description: 'Focus on urgent tasks',
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900'
        },
        {
            icon: Calendar,
            title: 'This Week',
            description: 'Weekly overview',
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900'
        },
        {
            icon: Download,
            title: 'Export',
            description: 'Download your data',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900'
        },
        {
            icon: Upload,
            title: 'Import',
            description: 'Import from file',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900'
        }
    ];

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {actions.map((action, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-left"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.bgColor} mb-3`}>
                            <action.icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                            {action.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {action.description}
                        </p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 