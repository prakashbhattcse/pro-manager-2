import React, { useEffect, useState } from 'react';
import style from "./Analytics.module.css";
import { getUserTodoById } from "../../apis/todo";

const Analytics = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        let id = localStorage.getItem("userId");
        let res = await getUserTodoById(id);
        if (res.data) {
            setData(res.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const backlogTasks = data.filter(todo => todo.status === 'Backlog').length;
    const todoTasks = data.filter(todo => todo.status === 'To Do').length;
    const inProgressTasks = data.filter(todo => todo.status === 'Progress').length;
    const completedTasks = data.filter(todo => todo.status === 'Done').length;

    const lowPriority = data.filter(todo => todo.priority === 'low').length;
    const moderatePriority = data.filter(todo => todo.priority === 'moderate').length;
    const highPriority = data.filter(todo => todo.priority === 'high').length;
    const dueDateTasks = data.filter(todo => todo.dueDate !== null).length;

    return (
        <div className={style.section}>
            <div className={style.container}>
                <h1>Analytics</h1>

                <div className={style.containerWrap}>
                    <ul className={style.dataContainer}>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Backlog Tasks</span>
                            </p>
                            <span className={style.dataValue}>{backlogTasks}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>To-do Tasks</span>
                            </p>
                            <span className={style.dataValue}>{todoTasks}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>In-Progress Tasks</span>
                            </p>
                            <span className={style.dataValue}>{inProgressTasks}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Completed Tasks</span>
                            </p>
                            <span className={style.dataValue}>{completedTasks}</span>
                        </li>
                    </ul>
                    <ul className={style.dataContainer}>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Low Priority</span>
                            </p>
                            <span className={style.dataValue}>{lowPriority}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Moderate Priority</span>
                            </p>
                            <span className={style.dataValue}>{moderatePriority}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>High Priority</span>
                            </p>
                            <span className={style.dataValue}>{highPriority}</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Due Date Tasks</span>
                            </p>
                            <span className={style.dataValue}>{dueDateTasks}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
