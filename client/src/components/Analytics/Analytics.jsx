import React from 'react'
import style from "./Analytics.module.css"


const Analytics = () => {
    return (
        <div className={style.section}>
            <div className={style.container}>
                <h1>Analytics</h1>


                <div className={style.containerWrap}>
                    <ul className={style.dataContianer}>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Backlog Tasks</span>
                            </p>
                            <span className={style.dataValue}>1</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>To-do Tasks</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>In-Progress Tasks</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Completed Tasks</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                    </ul>
                    <ul className={style.dataContianer}>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Low Priority</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Moderate Priority</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>High Priority</span>
                            </p>
                            <span className={style.dataValue}>1</span>
                        </li>
                        <li>
                            <p>
                                <span className={style.icon}></span>
                                <span className={style.label}>Due Date Tasks</span>
                            </p>
                            <span className={style.dataValue}>0</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Analytics