const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRoute = require("./Routes/auth")
const todoRoute = require("./Routes/todo")
const cors = require('cors')
const db = require("./db")

dotenv.config()
const app = express();

const Port = 3000;

app.use(express.json());
app.use(cors())
db();


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/todo", todoRoute)

app.get('/', (req,res)=>{
    res.json({
        service :"hello",
        status :"active"
    })
})



app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.listen(Port , ()=>{
    console.log("backend connected")
})