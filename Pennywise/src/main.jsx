import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard";
import { motion } from "framer-motion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="flex flex-col h-screen">
      <Router>
        <div className="flex flex-row px-6 py-12 items-center justify-between gap-5 w-full h-[3vw] rounded-2xl montserrat-medium z-50">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center bg-[#3f3f3f] rounded-2xl py-1 pl-2 pr-12"
          >
            <img src="./images/icons/logo.png" alt="logo" className="w-[2vw]" />
            <h2>Pennywise</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex gap-6"
          >
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white hover:text-red-400 transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white hover:text-red-400 transition-all"
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white hover:text-red-400 transition-all"
              }
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/accou"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white hover:text-red-400 transition-all"
              }
            >
              Account
            </NavLink>
          </motion.div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  </StrictMode>
);
