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
           res.status(200).json(allTodos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get all Todos", error: error.message });
    }
}

const getTodoById = async (req, res) => {

    try {
        const { id } = req.params;

        console.log( id)
        const result = await Todo.findOne({ _id: id});

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to get Todo", error: error.message });
    }
}

const getUserTodoById = async (req, res) => {

    try {
        const { id } = req.params;
        const userDetails = await User.findOne({ _id: id });
        const findEmail = userDetails.email;
        const result = await Todo.find({ createdBy: id });
        const anotherResult = await Todo.find({ assignTo: findEmail});
        if (result  || anotherResult) {
            res.status(200).json({data : [...result , ...anotherResult]});
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
        const { title, assignTo, priority, tasks, dueDate, status, createdBy , userId} = req.body.editData;

        // Construct the update object using $set operator
        const updateObject = {
            title,
            assignTo,
            priority,
            tasks,
            dueDate,
            status,
            createdBy
        };

        let ogData = await Todo.findOne({_id : id});
        if (ogData.assignTo != assignTo){
            const result = await Todo.updateOne({ _id: id , createdBy : userId}, { $set: updateObject });
            if (!result) {
                return;
            }
    
            // Fetch the updated todo item
            const updatedTodo = await Todo.findById(id);
    
            res.status(200).json(updatedTodo);
        }
        
        else{
        // Update the todo item in MongoDB using updateOne
        const result = await Todo.updateOne({ _id: id }, { $set: updateObject });
        
        // Check if no document matched the query
        if (!result) {
            return;
        }

        // Fetch the updated todo item
        const updatedTodo = await Todo.findById(id);

        res.status(200).json(updatedTodo);
    }
    } catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const { id, userId } = req.params;
        
        // Validate if id and userId are valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid id or userId format" });
        }

        // Delete the Todo document where _id and createdBy match
        const result = await Todo.deleteOne({ _id: id, createdBy: userId });

        // Check if the deletion was successful
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        // Respond with success message
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Failed to delete todo" });
    }
};



module.exports = { createTodo, getTodoById, getUserTodoById,getAllTodo, updateTodo, deleteTodo };


