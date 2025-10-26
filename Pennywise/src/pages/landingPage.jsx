import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -300]);

  return (
    <div className="relative flex flex-col gap-5 w-full h-full z-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.2, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed -bottom-210 -right-90 w-[90vw] aspect-square bg-[#1D1D1D] rounded-full z-0"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.2, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed -bottom-170 -right-40 w-[70vw] aspect-square bg-[#1A1A1A] rounded-full z-0"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.6, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed -bottom-90 right-30 w-[40vw] aspect-square bg-[#191818] rounded-full z-0"
        ></motion.div>

        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.9, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed w-[8vw] top-[8vw] right-[50vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.8, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed w-[10vw] top-[30vw] left-[30vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.8, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed w-[5vw] top-[43vw] right-[2vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
      </div>

      <div className="relative flex flex-row w-full h-full z-10">
        <motion.div
          style={{ opacity }}
          className="flex flex-col gap-2 w-[80%] h-full pt-[10vw] px-[3vw]"
        >
          <motion.h1
            initial={{ opacity: 0.2, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white montserrat-bold typo-head leading-tight"
          >
            <span className="text-red-900">Financial</span> clarity, <br />{" "}
            instantly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="typo-par text-gray-300"
          >
            Visualize your cash flow, set goals, and stay on top of every
            transaction. Take charge of your financial journey with the clarity
            you deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-row gap-5 mt-5"
          >
            <button className="typo-par poppins-medium rounded-xl bg-red-900 px-[3vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              Get Started
            </button>
            <button className="typo-par poppins-medium rounded-xl border-2 px-[2vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-[80%] aspect-square bg-[#111111] shadow-lg shadow-red-600/40 rounded-full z-0"></div>
        </div>
      </div>
      <div className="relative flex flex-row w-full h-fit z-10">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-[80%] aspect-square bg-[#111111] shadow-lg shadow-red-600/40 rounded-full z-0"></div>
        </div>
      </div>
    </div>
  );
}
