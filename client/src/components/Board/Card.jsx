import style from "./Board.module.css";
import { React, useState } from 'react';
import moment from 'moment';
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";

const Card = ({ todo, index, dropdown, toggleDropdown, handleTaskToggleMain, handleTaskChange, handleStatusChange, handleEditClick ,handleDeleteClick,handleShareClick}) => {

  const [editModal, setEditModal] = useState(false)

  const handleStatusClick = (newStatus) => {
    handleStatusChange(index, newStatus);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }


  return (
    <div className={style.todoCard}>
      <div className={style.spaceBtwn}>
        <div style={{display:"flex", gap:".7rem",alignItems:"center"}}>
          <p>{todo.priority}</p>
          <p style={{backgroundColor:"#FFEBEB", borderRadius:"50%",height:"30px",width:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>{todo.assignTo.slice(0, 2).toUpperCase()}</p>
        </div>
        <span>

          <button onClick={toggleEditModal} style={{border:"none",backgroundColor:"#FFFFFF",fontSize:"1.2rem",cursor:"pointer"}}><HiDotsHorizontal /></button>
          {
            editModal && <div>
              <div className={style.editModalPosition}>
                <button onClick={() => handleEditClick(index)}>Edit</button>
                <button onClick={() => handleShareClick(index)}>Share</button>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </div>
            </div>
          }
        </span>
      </div>
      <h4>{todo.title}</h4>

      <div className={style.checboxCardWrap}>
        <div className={style.dropdownIconText}>
          <p>Checklist: {todo.tasks.filter(task => task.completed).length}/{todo.tasks.length}</p>
          <span onClick={() => toggleDropdown(index)}>
            {dropdown[index] ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />}
          </span>
        </div>
        {dropdown[index] && (
          <div className={style.checboxCardWrap2}>
            {todo?.tasks?.map((task, taskIndex) => (
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
        )}
      </div>

      <div className={style.dataCardBtnWrap}>
        <button>{todo.dueDate ? moment(todo.dueDate).format('MMM Do') : 'No Due Date'}</button>
        <span>
          {todo.status !== 'Progress' && <button onClick={() => handleStatusClick('Progress')}>Progress</button>}
          {todo.status !== 'Backlog' && <button onClick={() => handleStatusClick('Backlog')}>Backlog</button>}
          {todo.status !== 'To Do' && <button onClick={() => handleStatusClick('To Do')}>ToDo</button>}
          {todo.status !== 'Done' && <button onClick={() => handleStatusClick('Done')}>Done</button>}
        </span>
      </div>


    </div>
  );
};

export default Card;
