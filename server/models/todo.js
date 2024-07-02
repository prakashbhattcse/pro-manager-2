const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    assignTo: {
        type: String
    },
    priority: {
        type: String,
        required: true
    },
    tasks: [
        {
            text: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean
            }
        }
    ],
    dueDate: { type: Date },
    status: {
        type: String,
        default: 'To Do',
        required: false
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", todoSchema);
