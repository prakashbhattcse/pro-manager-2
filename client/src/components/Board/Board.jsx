import React, { useState, useEffect } from 'react';
import style from "./Board.module.css";
import moment from 'moment';
import { CiSquareMinus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import TodoModal from './TodoModal';
import { createTodo, getAllTodo, updateTodo, deleteTodo, getUserTodoById } from '../../apis/todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Card';

const Board = () => {
  const userName = localStorage.getItem("name") || "User";
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("Do MMM, YYYY");
  const [todos, setTodos] = useState([]);
  const [data , setData] = useState();
  const [editData , setEditData] = useState();
  const [modal, setModal] = useState(false);
  const [dropdown, setDropdown] = useState({});
  const [modalData, setModalData] = useState({
    title: '',
    assignTo: '',
    priority: '',
    tasks: [],
    dueDate: null,
  });
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = (index) => {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      [index]: !prevDropdown[index],
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const allTodos = await getAllTodo();
        setTodos(allTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const modalInputChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value
    });
  };

  const handlePriorityClick = (selectedPriority) => {
    setModalData({ ...modalData, priority: selectedPriority });
  };

  const handleAddTask = () => {
    setModalData((prevData) => ({
      ...prevData,
      tasks: [...prevData.tasks, { text: '', completed: false }],
    }));
  };

  const handleTaskChange = (index, newText) => {
    const updatedTasks = [...modalData.tasks];
    updatedTasks[index].text = newText;
    setModalData((prevData) => ({
      ...prevData,
      tasks: updatedTasks,
    }));
  };

  const handleTaskToggle = (index) => {
    const updatedTasks = [...modalData.tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setModalData((prevData) => ({
      ...prevData,
      tasks: updatedTasks,
    }));
  };

  const handleTaskToggleMain = async (todoIndex, taskIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].tasks[taskIndex].completed = !updatedTodos[todoIndex].tasks[taskIndex].completed;

    try {
      const updatedTodo = await updateTodo(updatedTodos[todoIndex]._id, { tasks: updatedTodos[todoIndex].tasks });
      setTodos((prevTodos) =>
        prevTodos.map((todo, index) =>
          index === todoIndex ? { ...todo, tasks: updatedTodo.tasks } : todo
        )
      );
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('Failed to update task.');
    }
  };

  const handleSave = async () => {
  if(isEditing){
    if (!editData.title || !editData.priority || editData.tasks.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
  }
  else{
    if (!modalData.title || !modalData.priority || modalData.tasks.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
  }
    try {
      if (isEditing) {
        console.log(editData)
        let id = editData._id;
        const res = await updateTodo(id, editData);
         if(res){
        toast.success('Task updated successfully');
        return
         }
      } else {
        const newTodo = await createTodo({
          
          ...modalData,
          status: 'Backlog',
          createdBy: localStorage.getItem("userId"),
          createdAt: new Date(),
        });
        setTodos([...todos, newTodo]); // Update todos state here
        console.log(todos)
        toast.success('Task created successfully');
      }

      setModal(false);
      setModalData({
        title: '',
        assignTo: '',
        priority: '',
        tasks: [],
        dueDate: null,
      });
      setIsEditing(false);
      setCurrentTodo(null);
      fetchData();
    } catch (error) {
      console.error('Failed to save task:', error);
      toast.error('Failed to save task');
    }
  };

  const handleCancel = () => {
    setModal(false);
    setModalData({
      title: '',
      assignTo: '',
      priority: '',
      tasks: [],
      dueDate: null,
    });
    setIsEditing(false);
    setCurrentTodo(null);
  };


  // const handleStatusChange = async (todo, newStatus) => {

  //   console.log(todo)
  //   console.log(newStatus)
  
  //   const updatedTodo = { ...todo, status: newStatus };
  //   setEditData(updatedTodo);
  
  //   try {
  //     let id = updatedTodo._id;
  //     await updateTodo(id, updatedTodo);
  //     toast.success('Status updated successfully!');
  //     fetchData(); // Refetch data to update UI
  //   } catch (error) {
  //     toast.error('Failed to update status.');
  //   }
  // };
  

  const handleStatusChange = async (todo , newStatus) => {

        console.log(todo)
        console.log(newStatus)
        try {
          
          setEditData(todo)
          
          setEditData((prev)=>({...prev , status : newStatus}))
          console.log(editData)
          let id = editData._id;
          await updateTodo(id , editData);
          toast.success('Status updated successfully!');
          fetchData();
        } catch (error) {
          toast.error('Failed to update status.');
        }
      };  

  const handleModalOpen = () => {
    setIsEditing(false);
    setModalData({
      title: '',
      assignTo: '',
      priority: '',
      tasks: [],
      dueDate: null,
    });
    setModal(true);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
   
    setEditData(todo); 
    setModal(true);
  };

  const handleDeleteClick = async (id) => {
    console.log(id)
    const result = await deleteTodo(id);
    console.log("id2")
    console.log(id)
    if (result) {
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success('Todo deleted successfully!');
    }
  };


  const handleShareClick = (id) => {
 
    const linkToCopy = `http://localhost:5173/share/${id}`;

    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        toast.success('Quiz link copied to clipboard!', {
          position: "top-right",
          autoClose: 2000
        });
      })
      .catch(err => {
        toast.error('Failed to copy quiz link!', {
          position: "top-right",
          autoClose: 2000
        });
      });
  };


  
  const fetchData = async() => {
    let id = localStorage.getItem("userId")
    let res = await getUserTodoById(id , );
    if(res.data){
      setData(res.data)
      setTodos(res.data);
    }
    return;
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className={style.section}>
      <div className={style.box1}>
        <h2>Welcome {userName}</h2>
        <p>{formattedDate}</p>
      </div>

      <div className={style.box2}>
        <div className={style.box1}>
          <h2>Board</h2>
          <select>
            <option value="option1">Today</option>
            <option value="option2">This Week</option>
            <option value="option3">This Month</option>
          </select>
        </div>

        <div className={style.dataSection}>
          <div className={style.dataBox}>
            <div className={style.dataBoxHeader}>
              <p>Backlog</p>
              <CiSquareMinus />
            </div>
            {/* Backlog CARDS */}
            <div className={style.dataCardWrap}>
          
              {data?.map((todo, index) => (
                todo.status === 'Backlog' && (
                  <Card
                    key={todo._id}
                    todo={todo}
                    index={index}
                    dropdown={dropdown}
                    toggleDropdown={toggleDropdown}
                    handleTaskToggleMain={handleTaskToggleMain}
                    handleTaskChange={handleTaskChange}
                    handleStatusChange={handleStatusChange}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleShareClick={handleShareClick}
                  />
                )
              ))}


            </div>
          </div>

          <div className={style.dataBox}>
            <div className={style.dataBoxHeader}>
              <p>To do</p>
              <div className={style.iconGrp}>
                <FiPlus onClick={handleModalOpen} />
                <CiSquareMinus />
              </div>
            </div>

            <ToastContainer />
            {/* CARD SECTION START */}
            <div className={style.dataCardWrap}>
              {data?.map((todo, index) => (
                todo.status === 'To Do' && (
                  <Card
                    key={todo._id}
                    todo={todo}
                    index={index}
                    dropdown={dropdown}
                    toggleDropdown={toggleDropdown}
                    handleTaskToggleMain={handleTaskToggleMain}
                    handleTaskChange={handleTaskChange}
                    handleStatusChange={handleStatusChange}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleShareClick={handleShareClick}
                  />
                )
              ))}
            </div>
          </div>
          {/* CARD SECTION END */}

          <div className={style.dataBox}>
            <div className={style.dataBoxHeader}>
              <p>In progress</p>
              <CiSquareMinus />
            </div>
            {/* IN PROGRESS CARDS */}
            <div className={style.dataCardWrap}>
              {data?.map((todo, index) => (
                todo.status === 'Progress' && (
                  <Card
                    key={todo._id}
                    todo={todo}
                    index={index}
                    dropdown={dropdown}
                    toggleDropdown={toggleDropdown}
                    handleTaskToggleMain={handleTaskToggleMain}
                    handleTaskChange={handleTaskChange}
                    handleStatusChange={handleStatusChange}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleShareClick={handleShareClick}
                  />
                )
              ))}
            </div>
          </div>

          <div className={style.dataBox}>
            <div className={style.dataBoxHeader}>
              <p>Done</p>
              <CiSquareMinus />
            </div>
            {/* DONE CARDS */}
            <div className={style.dataCardWrap}>
              {data?.map((todo, index) => (
                todo.status === 'Done' && (

                  <Card
                    key={todo._id}
                    todo={todo}
                    index={index}
                    dropdown={dropdown}
                    toggleDropdown={toggleDropdown}
                    handleTaskToggleMain={handleTaskToggleMain}
                    handleTaskChange={handleTaskChange}
                    handleStatusChange={handleStatusChange}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleShareClick={handleShareClick}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
        editData={editData}
          modalInputChange={modalInputChange}
          handlePriorityClick={handlePriorityClick}
          handleTaskChange={handleTaskChange}
          handleTaskToggle={handleTaskToggle}
          handleAddTask={handleAddTask}
          handleCancel={handleCancel}
          handleSave={handleSave}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Board;
