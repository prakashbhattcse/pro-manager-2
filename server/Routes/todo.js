const express  = require('express')
const router = express.Router();
const todoController = require('../controller/todo')


router.post("/createTodo", todoController.createTodo)
router.get("/getAllTodo", todoController.getAllTodo)
router.get("/getTodoById/:id", todoController.getTodoById)
router.put("/updateTodo/:id", todoController.updateTodo)
router.delete("/deleteTodo/:id", todoController.deleteTodo)


module.exports = router;
