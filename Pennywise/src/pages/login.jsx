import React from "react";
import { motion } from "framer-motion";
import BackgroundClouds from "../components/backgroundClouds";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden relative">
        <div className="flex flex-col items-center justify-start gap-5 w-[20vw] h-fit py-[2vw] px-[1vw] bg-gray-300 rounded-2xl shadow-black shadow-lg text-[#0F0F0F]">
            <h1>LOG IN</h1>
            <form action="" className="w-full mb-[20%]">
                <label htmlFor="Username" className="px-[0.5vw]">Username</label>
                <input 
                    type="text"
                    placeholder="Enter Username"
                    id="Username"
                    className="w-full h-[2.5vw] px-[1vw] bg-gray-200 rounded-md border-b-1 border-gray-400 mb-5"/>
                <label htmlFor="Password" className="px-[0.5vw]">Password</label>
                <input 
                    type="password"
                    placeholder="Enter Password"
                    id="Password"
                    className="w-full h-[2.5vw] px-[1vw] bg-gray-200 rounded-md border-b-1 border-gray-400 mb-5" />
                <button className="w-full py-[0.4vw] bg-[#F25912] rounded-lg text-gray-200 font-medium text-[clamp(1rem,1.2vw,1.5rem)] hover:scale-102 duration-300 cursor-pointer">Log In</button>
            </form>
            <button className="text-[clamp(0.5rem,0.6vw,1rem)] cursor-pointer hover:text-orange-500"><span>Dont have account? Create Account</span></button>
        </div>
        <BackgroundClouds/>
    </div>
  );
}
