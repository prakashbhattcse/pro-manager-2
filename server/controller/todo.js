const Todo = require('../models/todo')
const mongoose = require("mongoose")
const User = require('../models/user')


const createTodo = async (req, res) => {
    const { title, assignTo, priority, tasks, dueDate, createdBy } = req.body;
  
    try {
      const newTodo = await Todo.create({
        title,
        assignTo,
        priority,
        tasks,
        dueDate,
        createdBy 
      });
  
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Failed to create todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  };
  
  

const getAllTodo = async (req, res) => {

    try {
        const { id } = req.params;
        const allTodos = await Todo.find({ createdBy: req.userId });

        console.log(`User ID: ${req.userId}`); 
        console.log(`Todo ID from params: ${id}`);
        console.log(`All Todos:`, allTodos); 
        res.status(200).json(allTodos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get all Todos", error: error.message });
    }
}

const getTodoById = async (req, res) => {

    try {
        const { id } = req.params;

        console.log(_id  , req.userId)
        const result = await Todo.findOne({ _id: id, createdBy: req.userId });

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
        const result = await Todo.updateOne({ _id: id, createdBy: req.userId }, { $set: updatedFields });

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
        // await Todo.deleteOne({ _id: id })
        await Todo.deleteOne({ _id: id, createdBy: req.userId });
        res.status(200).json({ message: "Todo Deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo" })
    }
}


module.exports = { createTodo, getTodoById, getAllTodo, updateTodo, deleteTodo };


