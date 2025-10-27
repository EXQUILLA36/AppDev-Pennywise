import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import BackgroundCircle from "../components/backgroundCircle";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -300]);

  return (
    <div className="flex flex-col w-full h-screen ">
      {/* Hero Section */}
      <section className="flex flex-row w-full h-fit p-5 z-10">
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
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="typo-par text-gray-300"
          >
            Visualize your cash flow, set goals, and stay on top of every
            transaction. Take charge of your financial journey with the clarity
            you deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
      </section>

      {/* Feature Section */}
      <section className="flex flex-col items-center w-full h-[1000vw] z-10">
        <motion.h1 className="text-white montserrat-bold typo-head leading-tight text-center">
          Everything You Need to{" "}
          <span className="text-[#F25912]">Manage Money</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="typo-par text-gray-300"
        >
          Powerful features designed to make financial management effortless
        </motion.p>
        <div className="flex flex-row justify-between w-full h-fit p-10">

          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[24%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]"><img src="./images/icons/wallet.svg" alt="wallet icon" className="w-full aspect-square" /></div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Money Tracker
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Monitor all your transactions in one place with detailed categorization
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[24%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]"><img src="./images/icons/graph.svg" alt="graphwallet icon" className="w-full aspect-square" /></div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Budget Management
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Set budgets for different categories and track your spending limits
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[24%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]"><img src="./images/icons/trend.svg" alt="trend icon" className="w-full aspect-square" /></div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Financial Insights
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Set budgets for different categories and track your spending limits
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[24%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]"><img src="./images/icons/shield.svg" alt="shield icon" className="w-full aspect-square" /></div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Secure & Private
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Your financial data is encrypted and protected with top-tier security
              </motion.p>
            </div>
          </div>
          
        </div>
      </section>
      <footer>
        
      </footer>

      <BackgroundCircle></BackgroundCircle>
    </div>
  );
}
