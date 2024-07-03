// import style from "./Board.module.css";
// import { React, useEffect, useState } from 'react';
// import moment from 'moment';
// import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
// import { HiDotsHorizontal } from "react-icons/hi";

// const Card = ({ todo, index, dropdown, toggleDropdown, handleTaskToggleMain, handleTaskChange, handleStatusChange, handleEditClick, handleDeleteClick, handleShareClick }) => {

//   const [editModal, setEditModal] = useState(false)
//   const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
//   const handleStatusClick = (newStatus) => {
//     handleStatusChange(todo, newStatus);
//   };

//   const toggleEditModal = () => {
//     setEditModal(!editModal)
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       setEditModal(false);
//     }, 9000)
//   }, [editModal])

//   const confirmDelete = (id) => {
//     setConfirmDeleteModal(true)
//   }
//   const onCancel = () => {
//     setConfirmDeleteModal(false)
//   }

//   return (
//     <div className={style.todoCard}>
//       <div className={style.spaceBtwn}>
//         <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
//           <p>{todo.priority}</p>
//           {todo.assignTo && (
//             <div className={style.tooltip} style={{ backgroundColor: "#FFEBEB", borderRadius: "50%", height: "30px", width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//               {todo.assignTo.slice(0, 2).toUpperCase()}
//               <span className={style.tooltiptext}>{todo.assignTo}</span>
//             </div>
//           )}
//         </div>

//         <span>

//           <button onClick={toggleEditModal} style={{ border: "none", backgroundColor: "#FFFFFF", fontSize: "1.2rem", cursor: "pointer" }}><HiDotsHorizontal /></button>
//           {
//             editModal && <div>
//               <div className={style.editModalPosition}>
//                 <button onClick={() => handleEditClick(todo)}>Edit</button>
//                 <button onClick={() => handleShareClick(todo._id)}>Share</button>
//                 <button onClick={confirmDelete}>Delete</button>
//               </div>
//             </div>
//           }

//         </span>
//         {confirmDeleteModal &&
//           <>
//             <div className={style.modalSection}>
//               <div className={style.addPeoplemodalContainer} style={{ textAlign: "center" }}>
//                 <h2>Are you sure you want to delete?</h2>
//                 <div className={style.peopleBtnWrap} style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
//                   <button className={style.saveBtn} onClick={() => handleDeleteClick(todo._id)}>Yes, Delete</button>
//                   <button className={style.cancelBtn} onClick={onCancel}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </>
//         }
//       </div>
//       <h4>{todo.title}</h4>

//       <div className={style.checboxCardWrap}>
//         <div className={style.dropdownIconText}>
//           <p>Checklist: {todo.tasks.filter(task => task.completed).length}/{todo.tasks.length}</p>
//           <span onClick={() => toggleDropdown(todo._id)}>
//             {dropdown[todo._id] ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />}
//           </span>
//         </div>
//         {dropdown[todo._id] && (
//           <div className={style.checboxCardWrap2}>
//             {todo?.tasks?.map((task, taskIndex) => (
//               <div key={taskIndex} className={style.taskBorder}>
//                 <input type="checkbox" checked={task.completed} onChange={() => handleTaskToggleMain(index, taskIndex)}
//                 />
//                 <input type="text" value={task.text} onChange={(e) => handleTaskChange(taskIndex, e.target.value)} id={style.taskInput} placeholder='Add a Task'
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className={style.dataCardBtnWrap}>
//         <button>{todo.dueDate ? moment(todo.dueDate).format('MMM Do') : 'No Due Date'}</button>
//         <span>
//           {todo.status !== 'Progress' && <button onClick={() => handleStatusClick('Progress')}>Progress</button>}
//           {todo.status !== 'Backlog' && <button onClick={() => handleStatusClick('Backlog')}>Backlog</button>}
//           {todo.status !== 'To Do' && <button onClick={() => handleStatusClick('To Do')}>ToDo</button>}
//           {todo.status !== 'Done' && <button onClick={() => handleStatusClick('Done')}>Done</button>}
//         </span>
//       </div>

//     </div>
//   );
// };

// export default Card;

import React, { useEffect, useState } from "react";
import style from "./Board.module.css";
import moment from "moment";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";

const Card = ({
  todo,
  index,
  dropdown,
  toggleDropdown,
  handleTaskToggleMain,
  handleTaskChange,
  handleStatusChange,
  handleEditClick,
  handleDeleteClick,
  handleShareClick,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const handleStatusClick = (newStatus) => {
    handleStatusChange(todo, newStatus);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };
  

  useEffect(() => {
    setTimeout(() => {
      setEditModal(false);
    }, 9000);
  }, [editModal]);

  const confirmDelete = () => {
    setConfirmDeleteModal(true);
  };

  const onCancel = () => {
    setConfirmDeleteModal(false);
  };

  const getDueDateClassName = () => {
    if (todo.dueDate) {
      const dueDate = moment(todo.dueDate);
      const currentDate = moment();
      if (dueDate.isBefore(currentDate, "day")) {
        return style.dueDateRed; // CSS class for red background
      } else {
        return style.dueDateGrey; // CSS class for green background
      }
    }
    return ""; // Ensure empty string is returned when there's no due date
  };

  const getStatusClassName = () => {
    if (todo.status === "Done") {
      return style.doneCard; // CSS class for green background when status is 'Done'
    }
    return "";
  };

  const getPriorityClassName = (priority) => {
    switch (priority) {
      case 'high':
        return style.redCircle;
      case 'moderate':
        return style.blueCircle;
      case 'low':
        return style.greenCircle;
      default:
        return '';
    }
  };


  return (
    <div className={style.todoCard}>
      <div className={style.spaceBtwn}>
        <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
          <p><span className={`${style.chipCircle} ${getPriorityClassName(todo.priority)}`}> </span> {todo.priority}</p>
          {todo.assignTo && (
            <div
              className={style.tooltip}
              style={{
                backgroundColor: "#FFEBEB",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {todo.assignTo.slice(0, 2).toUpperCase()}
              <span className={style.tooltiptext}>{todo.assignTo}</span>
            </div>
          )}
        </div>

        <span>
          <button
            onClick={toggleEditModal}
            style={{
              border: "none",
              backgroundColor: "#FFFFFF",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            <HiDotsHorizontal />
          </button>
          {editModal && (
            <div>
              <div className={style.editModalPosition}>
                <button onClick={() => handleEditClick(todo)}>Edit</button>
                <button onClick={() => handleShareClick(todo._id)}>
                  Share
                </button>
                <button onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          )}
        </span>

        {confirmDeleteModal && (
          <div className={style.modalSection}>
            <div
              className={style.addPeoplemodalContainer}
              style={{ textAlign: "center" }}
            >
              <h2>Are you sure you want to delete?</h2>
              <div
                className={style.peopleBtnWrap}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <button
                  className={style.saveBtn}
                  onClick={() => handleDeleteClick(todo._id)}
                >
                  Yes, Delete
                </button>
                <button className={style.cancelBtn} onClick={onCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <h4>{todo.title}</h4>

      <div className={style.checboxCardWrap}>
        <div className={style.dropdownIconText}>
          <p>
            Checklist: {todo.tasks.filter((task) => task.completed).length}/
            {todo.tasks.length}
          </p>
          <span onClick={() => toggleDropdown(todo._id)}>
            {dropdown[todo._id] ? (
              <BsFillArrowUpSquareFill />
            ) : (
              <BsFillArrowDownSquareFill />
            )}
          </span>
        </div>
        {dropdown[todo._id] && (
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
                  placeholder="Add a Task"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={style.dataCardBtnWrap}>
        {/* <button className={`${getDueDateClassName()} ${getStatusClassName()}`}>{todo.dueDate ? moment(todo.dueDate).format('MMM Do') : ''}</button> */}

        {todo.dueDate && (
          <button
            className={`${getDueDateClassName()} ${getStatusClassName()}`}
          >
            {moment(todo.dueDate).format("MMM Do")}
          </button>
        )}

        <span>
          {todo.status !== "Progress" && (
            <button onClick={() => handleStatusClick("Progress")}>
              Progress
            </button>
          )}
          {todo.status !== "Backlog" && (
            <button onClick={() => handleStatusClick("Backlog")}>
              Backlog
            </button>
          )}
          {todo.status !== "To Do" && (
            <button onClick={() => handleStatusClick("To Do")}>ToDo</button>
          )}
          {todo.status !== "Done" && (
            <button onClick={() => handleStatusClick("Done")}>Done</button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Card;
