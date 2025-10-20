import { BrowserRouter as Router, Routes, Route, Link, Navigate  } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/login'
import Dashboard from "./pages/dashboard";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div className="flex flex-col items-center pt-2 w-[100vw] h-[100vh] bg-[linear-gradient(to_top,#101010,#2B2B2B)]">
      <Router>
        <div className="flex flex-row items-center justify-between gap-5 p-3 w-[99%] h-[3vw] rounded-2xl shadow-black/50 shadow-md montserrat-medium">
        <img src="./images/icons/logo.png" alt="logo" className="w-[2vw]"/>
        <div className="flex gap-6">
          <Link to="/home">Home</Link>
          <Link to="/home">Transactions</Link>
          <Link to="/home">Marketplace</Link>
          <Link to="/home">Account</Link>
        </div>
          <Link to="/login">Login</Link>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Dashboard />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
    </div>
  </StrictMode>,
)
