
import './App.css'


import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import RegestrationLogin from './pages/RegestrationLogin/RegestrationLogin'
import TodoPage from './pages/TodoPage/TodoPage'
import Analytics from './components/Analytics/Analytics'
import Settings from './components/Settings/Settings'




function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<RegestrationLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/analytics' element={<Analytics />} />
        <Route path='/dashboard/settings' element={<Settings />} />
        <Route path='/share/:id' element={<TodoPage />} />
      </Routes>
    </>
  )
}

export default App
