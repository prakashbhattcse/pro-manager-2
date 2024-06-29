const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    assignTo: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: true
    },
    tasks: [{
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    dueDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        default: 'To Do',
        required: false
    },
    createdBy: {
        type: String,
        required: true    
    }
},

    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }

);

module.exports = mongoose.model("Todo", todoSchema);
