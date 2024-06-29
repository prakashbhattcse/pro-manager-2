const Todo = require('../models/todo')
const mongoose = require("mongoose")

const createTodo = async (req, res) => {
    const { title, assignTo, priority, tasks, dueDate,createdBy } = req.body;

    try {
        const newTodo = new Todo({
            title,
            assignTo,
            priority,
            tasks,
            dueDate: new Date(dueDate),
            mongoose.Schema.Types.ObjectId(createdBy),
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create Todo', error: error.message });
    }
};



const getAllTodo = async (req, res) => {

    try {
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get all Todos", error: error.message });
    }
}

const getTodoById = async (req, res) => {

    try {
        const { id } = req.params;

        const result = await Todo.findOne({ _id: id });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to get Todo", error: error.message });
    }
}

const getUserDataById = async (req, res) => {

    try {
        const { id } = req.params;

        const result = await User.findOne({ _id: id });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to get Todo", error: error.message });
    }
}


const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const result = await Todo.updateOne({ _id: id }, { $set: updatedFields });

        if (result.n === 0) {
            throw new Error('Task not found or no changes made');
        }

        const updatedTodo = await Todo.findById(id);

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.deleteOne({ _id: id })
        res.status(200).json({ message: "Todo Deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo" })
    }
}


module.exports = { createTodo, getTodoById, getAllTodo, updateTodo, deleteTodo };



index [
   name:"anme",
   age: 20,
   address: "address",
]

index[1]