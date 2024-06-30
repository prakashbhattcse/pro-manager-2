import axios from "axios";

const link = "http://localhost:3000/api/v1/todo"

export const createTodo = async ({ assignTo, dueDate, priority, title, tasks }) => {
    try {
        const reqUrl = `${link}/createTodo`;
        const response = await axios.post(reqUrl, {
            assignTo,
            dueDate,
            priority,
            title,
            tasks,
            createdBy: localStorage.getItem("userId"),
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
}


export const getAllTodo = async (req, res) => {

    try {
        const reqUrl = `${link}/getAllTodo`;
        const response = await axios.get(reqUrl);
        console.log(response.data)
        return response.data;
    } catch (error) {

    }
}

export const getTodoById = async (id) => {
    try {
        const reqUrl = `${link}/getTodoById/${id}`;
        const result = await axios.get(reqUrl);

        if (result) {
            return result.data;
        }
    } catch (error) {
        return "Failed";
    }
}

export const updateTodo = async (id, updatedFields) => {
    console.log(id, updatedFields)
    try {
        const reqUrl = `${link}/updateTodo/${id}`;
        const response = await axios.put(reqUrl, updatedFields);

        return response.data;
    } catch (error) {
        console.error('Failed to update todo:', error);
        throw new Error('Failed to update todo');
    }
};


export const deleteTodo = async (id) => {
    try {
        const reqUrl = `${link}/deleteTodo/${id}`;
        const response = await axios.delete(reqUrl);

        if (response.data.message) {
            return response.data.message
        }
    } catch (error) {
        return "Failed";
    }
}