import React, { useState } from 'react'
import style from "./Dashboard.module.css"
import style1 from "../../components/Board/Board.module.css"
import logo from "../../assets/logo.png"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import Board from '../../components/Board/Board';
import Analytics from '../../components/Analytics/Analytics';
import Settings from '../../components/Settings/Settings';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('board')
  const [data, setData] = useState('')
const [confirmLogoutModal, setConfirmLogoutModal] = useState(false)

  useEffect(() => {

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/auth/')
      } catch (error) {

      }
    }

  }, [])


   const handleLogout = () => {


    localStorage.removeItem('authToken');

    navigate('/');
};

const onCancel = ()=>{
  setConfirmLogoutModal(false)
}


  return (
    <div>

      <div className={style.dashboardSection}>
        <div className={style.tabSection}>
          <div className={style.logo}>
            <img src={logo} alt="" /> <span>Pro Manage</span>
          </div>

          <div className={style.tabGrp}>
            <div
              className={`${style.tab} ${activeTab === 'board' ? style.active : ''}`}
              onClick={() => setActiveTab('board')}
            >
              <MdOutlineSpaceDashboard /> Board
            </div>
            <div
              className={`${style.tab} ${activeTab === 'analytics' ? style.active : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <GoDatabase /> Analytics
            </div>
            <div
              className={`${style.tab} ${activeTab === 'settings' ? style.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <CiSettings /> Settings
            </div>
          </div>

          <button onClick={()=>setConfirmLogoutModal(true)}><IoExitOutline />Logout</button>


          {confirmLogoutModal &&
          (
            <div className={style1.modalSection}>
              <div className={style1.addPeoplemodalContainer} style={{textAlign:"center"}}>
                <h2>Are you sure you want to Logout?</h2>
                <div className={style1.peopleBtnWrap} style={{display:'flex', flexDirection:"column",alignItems:"center"}}>
                  <button className={style1.saveBtn} onClick={handleLogout} style={{ backgroundColor: '#17a2b8', border: 'none', fontSize: '1.2rem', color: 'white',cursor: 'pointer' ,display:"flex",alignItems:"center",justifyContent:"center"}}>Yes, Logout</button>
                  <button className={style1.cancelBtn} onClick={onCancel} style={{ backgroundColor: 'transparent', border: '2px solid #cf3636', fontSize: '1.2rem', color: '#cf3636', cursor: 'pointer' ,display:"flex",alignItems:"center",justifyContent:"center"}} >Cancel</button>
                </div>
              </div>
            </div>
          )
        }
        </div>
        <div className={style.tabDataSection}>
          {activeTab === "board" && <div><Board /></div>}
          {activeTab === "analytics" && <div><Analytics /></div>}
          {activeTab === "settings" && <div><Settings /></div>}

        </div>
      </div>
    </div>
  )
}

export default Dashboard