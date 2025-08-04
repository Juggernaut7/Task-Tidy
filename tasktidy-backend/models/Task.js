const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    category: {
        type: String,
        trim: true,
        default: 'General'
    },
    tags: [{
        type: String,
        trim: true
    }],
    dueDate: {
        type: Date
    },
    reminderDate: {
        type: Date
    },
    estimatedTime: {
        type: Number, // in minutes
        min: 0
    },
    actualTime: {
        type: Number, // in minutes
        min: 0
    },
    attachments: [{
        filename: String,
        url: String,
        size: Number,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    subtasks: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    notes: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'review', 'completed'],
        default: 'todo'
    },
    assignedTo: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

// Update the updatedAt field before saving
TaskSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Update the updatedAt field before updating
TaskSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Virtual for checking if task is overdue
TaskSchema.virtual('isOverdue').get(function() {
    if (!this.dueDate || this.completed) return false;
    return new Date() > this.dueDate;
});

// Virtual for task progress (based on subtasks)
TaskSchema.virtual('progress').get(function() {
    if (!this.subtasks || this.subtasks.length === 0) {
        return this.completed ? 100 : 0;
    }
    const completedSubtasks = this.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / this.subtasks.length) * 100);
});

// Index for better query performance
TaskSchema.index({ createdBy: 1, createdAt: -1 });
TaskSchema.index({ createdBy: 1, status: 1 });
TaskSchema.index({ createdBy: 1, priority: 1 });
TaskSchema.index({ createdBy: 1, category: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ tags: 1 });

module.exports = mongoose.model('Task', TaskSchema);