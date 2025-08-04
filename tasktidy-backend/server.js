require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// --- MongoDB Connection Retry Configuration ---
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;
let connectionAttempts = 0;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Function to connect to MongoDB with retry logic
const connectWithRetry = () => {
    connectionAttempts++;
    console.log(`Attempting to connect to MongoDB (Attempt ${connectionAttempts}/${MAX_RETRIES})...`);

    if (!MONGODB_URI) {
        console.error('CRITICAL: MONGODB_URI is not defined. Please set it in your .env file or Vercel environment variables.');
        process.exit(1);
    }

    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected successfully!');
            connectionAttempts = 0;
        })
        .catch(err => {
            console.error('MongoDB connection error:', err.message);

            if (connectionAttempts < MAX_RETRIES) {
                console.log(`Retrying MongoDB connection in ${RETRY_DELAY_MS / 1000} seconds...`);
                setTimeout(connectWithRetry, RETRY_DELAY_MS);
            } else {
                console.error(`Max MongoDB connection retries (${MAX_RETRIES}) exceeded. Exiting process.`);
                process.exit(1);
            }
        });
};

// Initial connection attempt
connectWithRetry();

// Import Models
const Task = require('./models/Task');
const User = require('./models/User');
const TaskTemplate = require('./models/TaskTemplate');

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Validation middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: errors.array() 
        });
    }
    next();
};

// --- API Routes ---

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'TaskTidy Backend API is running!',
        version: '2.0.0',
        timestamp: new Date().toISOString()
    });
});

// --- Authentication Routes ---

// Register user
app.post('/api/auth/register', [
    body('username').isLength({ min: 3, max: 30 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').optional().trim().escape(),
    body('lastName').optional().trim().escape(),
    handleValidationErrors
], async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email or username already exists' 
            });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password,
            firstName,
            lastName
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login user
app.post('/api/auth/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    handleValidationErrors
], async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last active date
        user.stats.lastActiveDate = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            message: 'Login successful',
            user: userResponse,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update user profile
app.patch('/api/auth/profile', authenticateToken, [
    body('firstName').optional().trim().escape(),
    body('lastName').optional().trim().escape(),
    body('preferences').optional().isObject(),
    handleValidationErrors
], async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// --- Task Routes ---

// Create task
app.post('/api/tasks', authenticateToken, [
    body('title').isLength({ min: 1, max: 200 }).trim().escape(),
    body('description').optional().isLength({ max: 1000 }).trim().escape(),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('category').optional().trim().escape(),
    body('tags').optional().isArray(),
    body('dueDate').optional().isISO8601(),
    body('estimatedTime').optional().isInt({ min: 0 }),
    handleValidationErrors
], async (req, res) => {
    try {
        const taskData = {
            ...req.body,
            createdBy: req.user.username
        };

        const newTask = new Task(taskData);
        await newTask.save();

        // Update user stats
        await User.findByIdAndUpdate(req.user.userId, {
            $inc: { 'stats.totalTasks': 1 }
        });

        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all tasks with advanced filtering
app.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
        const {
            status,
            priority,
            category,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = 1,
            limit = 20,
            dueDate,
            tags
        } = req.query;

        // Build filter object
        const filter = { createdBy: req.user.username };

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;
        if (dueDate) {
            const date = new Date(dueDate);
            filter.dueDate = {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            };
        }
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            filter.tags = { $in: tagArray };
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const tasks = await Task.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Task.countDocuments(filter);

        res.json({
            tasks,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get task by ID
app.get('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user.username
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update task
app.patch('/api/tasks/:id', authenticateToken, [
    body('title').optional().isLength({ min: 1, max: 200 }).trim().escape(),
    body('description').optional().isLength({ max: 1000 }).trim().escape(),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('category').optional().trim().escape(),
    body('tags').optional().isArray(),
    body('dueDate').optional().isISO8601(),
    body('status').optional().isIn(['todo', 'in-progress', 'review', 'completed']),
    body('completed').optional().isBoolean(),
    handleValidationErrors
], async (req, res) => {
    try {
        const updateData = req.body;

        // Handle completion status
        if (updateData.completed !== undefined) {
            updateData.completedAt = updateData.completed ? new Date() : null;
            
            // Update user stats
            const task = await Task.findById(req.params.id);
            if (task && task.createdBy === req.user.username) {
                const statUpdate = updateData.completed ? 
                    { $inc: { 'stats.completedTasks': 1 } } :
                    { $inc: { 'stats.completedTasks': -1 } };
                await User.findByIdAndUpdate(req.user.userId, statUpdate);
            }
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.username },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error('Error updating task:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete task
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.username
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update user stats
        await User.findByIdAndUpdate(req.user.userId, {
            $inc: { 'stats.totalTasks': -1 },
            ...(task.completed && { $inc: { 'stats.completedTasks': -1 } })
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Bulk operations
app.post('/api/tasks/bulk', authenticateToken, [
    body('action').isIn(['delete', 'update', 'complete']),
    body('taskIds').isArray(),
    body('updates').optional().isObject(),
    handleValidationErrors
], async (req, res) => {
    try {
        const { action, taskIds, updates } = req.body;

        switch (action) {
            case 'delete':
                const deletedTasks = await Task.find({
                    _id: { $in: taskIds },
                    createdBy: req.user.username
                });
                
                await Task.deleteMany({
                    _id: { $in: taskIds },
                    createdBy: req.user.username
                });

                // Update user stats
                const completedCount = deletedTasks.filter(task => task.completed).length;
                await User.findByIdAndUpdate(req.user.userId, {
                    $inc: { 
                        'stats.totalTasks': -deletedTasks.length,
                        'stats.completedTasks': -completedCount
                    }
                });

                res.json({ 
                    message: `${deletedTasks.length} tasks deleted successfully` 
                });
                break;

            case 'update':
                const updatedTasks = await Task.updateMany(
                    { _id: { $in: taskIds }, createdBy: req.user.username },
                    updates,
                    { runValidators: true }
                );
                res.json({ 
                    message: `${updatedTasks.modifiedCount} tasks updated successfully` 
                });
                break;

            case 'complete':
                const completedTasks = await Task.updateMany(
                    { _id: { $in: taskIds }, createdBy: req.user.username },
                    { 
                        completed: true, 
                        completedAt: new Date(),
                        status: 'completed'
                    }
                );
                
                // Update user stats
                await User.findByIdAndUpdate(req.user.userId, {
                    $inc: { 'stats.completedTasks': completedTasks.modifiedCount }
                });

                res.json({ 
                    message: `${completedTasks.modifiedCount} tasks completed successfully` 
                });
                break;
        }
    } catch (err) {
        console.error('Bulk operation error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// --- Analytics Routes ---

// Get task analytics
app.get('/api/analytics', authenticateToken, async (req, res) => {
    try {
        const { period = '30' } = req.query;
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(period));

        // Task completion trends
        const completionTrends = await Task.aggregate([
            {
                $match: {
                    createdBy: req.user.username,
                    completedAt: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Priority distribution
        const priorityDistribution = await Task.aggregate([
            {
                $match: { createdBy: req.user.username }
            },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Category distribution
        const categoryDistribution = await Task.aggregate([
            {
                $match: { createdBy: req.user.username }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Status distribution
        const statusDistribution = await Task.aggregate([
            {
                $match: { createdBy: req.user.username }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Overdue tasks
        const overdueTasks = await Task.countDocuments({
            createdBy: req.user.username,
            dueDate: { $lt: new Date() },
            completed: false
        });

        // Today's tasks
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todaysTasks = await Task.countDocuments({
            createdBy: req.user.username,
            dueDate: { $gte: today, $lt: tomorrow }
        });

        res.json({
            completionTrends,
            priorityDistribution,
            categoryDistribution,
            statusDistribution,
            overdueTasks,
            todaysTasks
        });
    } catch (err) {
        console.error('Analytics error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// --- Task Template Routes ---

// Create template
app.post('/api/templates', authenticateToken, [
    body('name').isLength({ min: 1, max: 100 }).trim().escape(),
    body('description').optional().isLength({ max: 500 }).trim().escape(),
    body('category').optional().trim().escape(),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('estimatedTime').optional().isInt({ min: 0 }),
    body('subtasks').optional().isArray(),
    body('tags').optional().isArray(),
    body('isPublic').optional().isBoolean(),
    handleValidationErrors
], async (req, res) => {
    try {
        const templateData = {
            ...req.body,
            createdBy: req.user.username
        };

        const newTemplate = new TaskTemplate(templateData);
        await newTemplate.save();

        res.status(201).json(newTemplate);
    } catch (err) {
        console.error('Error creating template:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get user templates
app.get('/api/templates', authenticateToken, async (req, res) => {
    try {
        const templates = await TaskTemplate.find({
            $or: [
                { createdBy: req.user.username },
                { isPublic: true }
            ]
        }).sort({ createdAt: -1 });

        res.json(templates);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create task from template
app.post('/api/templates/:id/create-task', authenticateToken, [
    body('title').optional().isLength({ min: 1, max: 200 }).trim().escape(),
    body('dueDate').optional().isISO8601(),
    handleValidationErrors
], async (req, res) => {
    try {
        const template = await TaskTemplate.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        if (!template.isPublic && template.createdBy !== req.user.username) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Create task from template
        const taskData = template.createTask(req.user.username, req.body);
        const newTask = new Task(taskData);
        await newTask.save();

        // Increment template usage count
        await TaskTemplate.findByIdAndUpdate(req.params.id, {
            $inc: { usageCount: 1 }
        });

        // Update user stats
        await User.findByIdAndUpdate(req.user.userId, {
            $inc: { 'stats.totalTasks': 1 }
        });

        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error creating task from template:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// --- Error handling middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`🚀 TaskTidy Backend running on port ${PORT}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});