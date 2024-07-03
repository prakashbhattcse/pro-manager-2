import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png"
import style1 from "./TodoPage.module.css";
import moment from 'moment';
import style from "../../components/Board//Board.module.css"
import { useParams } from 'react-router-dom';
import { getTodoById } from "../../apis/todo"

const TodoPage = () => {

    const { id } = useParams();
    console.log(id)
    const [todo, setTodo] = useState(null);
    // const [loading , setLoading] = useState(true);

    console.log(id)

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const todoData = await getTodoById(id);
                if (todoData) {
                    setTodo(todoData);
                    console.log(todoData)
                }
            } catch (error) {
                console.error('Failed to fetch todo:', error);

            }
        };

        setTimeout(() => {
            fetchTodo();
        }, 500)
    }, [id]);

    if (!todo) {
        return <p>Loading...</p>;
    }

    const formattedDate = moment(todo.currentDate).format("MMM Do");
    return (

        <div>

            {todo ?
                <div className={style1.shareOutline}>
                    <div style={{ width: "100%", padding: "15px 20px", display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img src={logo} alt="" style={{ width: "3rem" }} /><span style={{ fontSize: "1.8rem", fontWeight: "600" }}>Pro Manage</span>
                    </div>
                    <div className={style1.shareSection}>
                        <div className={style1.todoShareCard}>

                            <p style={{ textTransform: "capitalize" }}>{todo?.priority} Priority</p>


                            <h2>{todo?.title}</h2>

                            <div className={style.checboxCardWrap}>
                                <div className={style.dropdownIconText}>
                                    <p>Checklist: {todo?.tasks?.filter(task => task.completed).length}/{todo?.tasks?.length}</p>

                                </div>

                                <div id={style1.shareScroll} className={style.checboxCardWrap2}>
                                    {todo?.tasks.map((task, taskIndex) => (
                                        <div key={taskIndex} className={style.taskBorder}>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleTaskToggleMain(index, taskIndex)}
                                            />
                                            <input
                                                type="text"
                                                value={task.text}
                                                onChange={(e) => handleTaskChange(taskIndex, e.target.value)}
                                                id={style.taskInput}
                                                placeholder='Add a Task'
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p style={{ paddingTop: "1rem" }}>Due Date <span id={style1.dueDateBtn}>{formattedDate}</span></p>
                            </div>

                        </div>
                    </div>
                </div>
                : <h1>Loading...</h1>}
        </div>
    );
};
export default TodoPage