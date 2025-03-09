import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import MainApp from './Messenger/MainApp'
import Login from './Messenger/Login/Login'
import Logo from './Messenger/Logo/Logo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/logo" />} />
        <Route path='/logo' element={<Logo/>} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route
          path="/app"
          element={isLoggedIn ? <MainApp /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
