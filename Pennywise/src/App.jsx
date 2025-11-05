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
import Transactions from "./pages/transactions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function App() {
  useGSAP(() => {
    gsap.fromTo(
      ".logo-section",
      {
        width: "5vw",
      },
      {
        width: "9vw",
        duration: 1.2,
        ease: "expo.inOut",
      }
    );

    gsap.from(".logo-text", {
      opacity: 0,
      x: -30,
      duration: 1.2,
      ease: "expo.inOut",
    });

    gsap.from(".navigation-links ", {
      opacity: 0.4,
      x: 20,
      duration: 1.2,
      ease: "circ.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col">
      <Router>
        <div className="flex flex-row px-6 py-12 items-center justify-between gap-5 w-full h-[3vw] rounded-2xl montserrat-medium z-50">
          <div className="logo-section flex items-center bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] rounded-2xl py-1 pl-2 pr-12">
            <img
              src="./images/icons/logo.png"
              alt="logo"
              className="w-[2vw] aspect-square"
            />
            <h2 className="logo-text typo-par">Pennywise</h2>
          </div>
          <div className="navigation-links flex gap-6">
            <NavLink
              to="/landingpage"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/accou"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Account
            </NavLink>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/landingpage" replace />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
