import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScrollTrigger, ScrollSmoother, SplitText } from "gsap/all";
import gsap from "gsap";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!clerkPubKey) {
  throw new Error("Clerk publishable key is not defined in environment variables");
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} appearance={{ theme: 'night' }}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
