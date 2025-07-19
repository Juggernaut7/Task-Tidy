require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
// In development, we'll allow all CORS. For production, restrict to your frontend URL.
app.use(cors());
app.use(express.json()); // Body parser for JSON data

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// Import Task Model
const Task = require('./models/Task');

// --- API Routes ---

// POST /tasks – Add a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask); // 201 Created
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /tasks – Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        // Fetch tasks and sort by newest first (createdAt in descending order)
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /tasks/:id – Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        // Handle specific Mongoose CastError for invalid IDs
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PATCH /tasks/:id – Update a task's completion status
app.patch('/tasks/:id', async (req, res) => {
    const { completed } = req.body;

    // Basic validation: ensure 'completed' is a boolean
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid "completed" status provided. Must be true or false.' });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed },
            { new: true, runValidators: true } // `new: true` returns the updated doc; `runValidators: true` ensures schema validation
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        console.error('Error updating task completion:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// --- Basic Server Check ---

// A simple route to confirm the backend is running
app.get('/', (req, res) => {
    res.send('TaskTidy Backend API is running!');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connect to MongoDB via: ${MONGODB_URI ? 'URI provided' : 'No URI provided!'}`);
});