import React, { useState } from 'react'
import style from "./Dashboard.module.css"
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

          <button onClick={handleLogout}><IoExitOutline />Logout</button>
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