import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import BackgroundCircle from "../components/backgroundCircle";

export default function LandingPage() {
  const slideUp = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -300]);

  useGSAP(() => {
    gsap.from(".slide-right-stagger", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".slide-right-stagger",
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".illustration", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(".feature-text", {
      scrollTrigger: {
        trigger: ".feature-text",
        start: "top 90%",
        end: "bottom 30%",
        toggleActions: "play none play reverse",
      },
      yPercent: 130,
      stagger: 0.5
    });
  }, []);

  return (
    <div className="flex flex-col gap-[5vw] w-full h-screen">
      {/* Hero Section */}
      <section className="flex flex-row w-full h-fit p-5 z-10">
        <div className="flex flex-col gap-5 w-[80%] h-full pt-[10vw] px-[3vw]">
          <h1 className="slide-right-stagger text-white montserrat-bold typo-head leading-tight">
            <span className="text-red-900">Financial</span> clarity, <br />{" "}
            instantly
          </h1>
          <p className="slide-right-stagger typo-par text-gray-300">
            Visualize your cash flow, set goals, and stay on top of every
            transaction. Take charge of your financial journey with the clarity
            you deserve.
          </p>
          <div className="slide-right-stagger flex flex-row gap-5 mt-5">
            <button className="typo-par poppins-medium rounded-xl bg-red-900 px-[3vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 duration-300 cursor-pointer">
              Get Started
            </button>
            <button className="typo-par poppins-medium rounded-xl border-2 px-[2vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 duration-300 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
        <div className="illustration flex justify-center items-center w-full h-full">
          <div className="w-[33vw] overflow-clip aspect-square bg-[linear-gradient(to_bottom,_rgba(43,41,41,1),_rgba(22,22,22,1))] shadow-lg shadow-red-600/40 rounded-full border-red-900/50 border-2 z-0">
            <img
              src="./images/illustrations/model.png"
              alt="model illustration"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section flex flex-col items-center w-full h-[1000vw] z-10">
        <div className="overflow-hidden">
          <h1 className="feature-text text-white montserrat-bold typo-head leading-tight text-center">
            Everything You Need to{" "}
            <span className="text-[#F25912]">Manage Money</span>
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="feature-text typo-par text-gray-300">
            Powerful features designed to make financial management effortless
          </p>
        </div>
        <div className="flex flex-row justify-between w-full h-fit p-10">
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              <img
                src="./images/icons/wallet.svg"
                alt="wallet icon"
                className="w-full aspect-square"
              />
            </div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Money Tracker
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Monitor all your transactions in one place with detailed
                categorization
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              <img
                src="./images/icons/graph.svg"
                alt="graphwallet icon"
                className="w-full aspect-square"
              />
            </div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Budget Management
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Set budgets for different categories and track your spending
                limits
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              <img
                src="./images/icons/trend.svg"
                alt="trend icon"
                className="w-full aspect-square"
              />
            </div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Financial Insights
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Set budgets for different categories and track your spending
                limits
              </motion.p>
            </div>
          </div>
          <div className="flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-10 rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-3 bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
              <img
                src="./images/icons/shield.svg"
                alt="shield icon"
                className="w-full aspect-square"
              />
            </div>
            <div>
              <motion.h1 className="text-white montserrat-bold typo-sub leading-tight">
                Secure & Private
              </motion.h1>
              <motion.p className="typo-par text-gray-300">
                Your financial data is encrypted and protected with top-tier
                security
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <BackgroundCircle></BackgroundCircle>
    </div>
  );
}
