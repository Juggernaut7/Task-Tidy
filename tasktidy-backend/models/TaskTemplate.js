const mongoose = require('mongoose');

const TaskTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    category: {
        type: String,
        trim: true,
        default: 'General'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    estimatedTime: {
        type: Number, // in minutes
        min: 0
    },
    subtasks: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        order: {
            type: Number,
            default: 0
        }
    }],
    tags: [{
        type: String,
        trim: true
    }],
    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    usageCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
TaskTemplateSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Method to create a task from template
TaskTemplateSchema.methods.createTask = function(userId, customData = {}) {
    const taskData = {
        title: customData.title || this.name,
        description: customData.description || this.description,
        category: customData.category || this.category,
        priority: customData.priority || this.priority,
        estimatedTime: customData.estimatedTime || this.estimatedTime,
        tags: customData.tags || [...this.tags],
        notes: customData.notes || this.notes,
        subtasks: this.subtasks.map(subtask => ({
            title: subtask.title,
            completed: false,
            createdAt: new Date()
        })),
        createdBy: userId
    };

    // Add custom due date if provided
    if (customData.dueDate) {
        taskData.dueDate = customData.dueDate;
    }

    return taskData;
};

// Indexes for better query performance
TaskTemplateSchema.index({ createdBy: 1, createdAt: -1 });
TaskTemplateSchema.index({ isPublic: 1, usageCount: -1 });
TaskTemplateSchema.index({ category: 1 });
TaskTemplateSchema.index({ tags: 1 });

module.exports = mongoose.model('TaskTemplate', TaskTemplateSchema); 