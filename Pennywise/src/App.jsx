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
// import Login from "./pages/login";
// import Signup from "./pages/signup";
import Signin from "./pages/signIn";
import Signup from "./pages/signUp";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Budget from "./pages/budget";
import Marketplace from "./pages/marketplace";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useAccount } from "./utils/account";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  const account = useAccount();

  console.log(account);

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
          <div className="logo-section flex items-center bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] rounded-lg gap-2 py-2 pl-2 pr-12">
            <img
              src="./images/icons/logo.png"
              alt="logo"
              className="w-[1.5vw] aspect-square"
            />
            <h2 className="logo-text typo-par">Pennywise</h2>
          </div>
          <div className="navigation-links items-center flex gap-6">
            <SignedOut>
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
            </SignedOut>
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
              to="/budget"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 typo-par font-semibold border-b-2 border-red-400 pb-1 transition-all"
                  : "text-white typo-par hover:text-red-400 transition-all"
              }
            >
              Budget
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
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "!w-[2.5vw] !h-[2.5vw] !border-[2px] !border-red-500/60",
                },
              }}
            ></UserButton>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/landingpage" replace />} />
          <Route path="/landingpage" element={<LandingPage />} />

          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </Router>
    </div>
  );
}
