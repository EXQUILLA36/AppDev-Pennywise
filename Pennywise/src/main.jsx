import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import "./index.css";
import App from "./App";

gsap.registerPlugin(ScrollTrigger, SplitText)


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
