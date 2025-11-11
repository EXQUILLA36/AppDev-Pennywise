import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { UserButton } from "@clerk/clerk-react";
import BackgroundParticles from "@/components/backgroundParticles";

import BackgroundCircle from "../components/backgroundCircle";

export default function LandingPage() {
  const slideUp = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -300]);
  const navigate = useNavigate();
  const [scrollPage, setScrollPage] = useState("");

  useGSAP(() => {
    gsap.from(".slide-right-stagger", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".slide-right-stagger",
        start: "top 90%",
        end: "bottom 5%",
        toggleActions: "play reverse play reverse",
      },
    });
    gsap.from(".slide-right", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".slide-right",
        start: "top 90%",
        end: "bottom 5%",
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
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      },
      yPercent: 130,
      stagger: 0.5,
    });
    gsap.from(".howto-text", {
      scrollTrigger: {
        trigger: ".howto-text",
        start: "top 90%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
      yPercent: 130,
      stagger: 0.5,
    });

    gsap.from(".feature-card", {
      opacity: 0,
      y: 120,
      duration: 0.4,
      scrollTrigger: {
        trigger: ".feature-card",
        start: "top 80%",
        end: "70% 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".howto-card", {
      opacity: 0,
      x: 120,
      duration: 0.4,
      scrollTrigger: {
        trigger: ".howto-card",
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play none play reverse",
      },
    });
    gsap.from(".howto-card-reverse", {
      opacity: 0,
      x: -120,
      duration: 0.4,
      scrollTrigger: {
        trigger: ".howto-card",
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play none play reverse",
      },
    });

    gsap.from(".finance-section", {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".finance-section",
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play none play reverse",
      },
    });

    gsap.from(".finance-image", {
      x: -50,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    if (!scrollPage) return;

    const target = document.getElementById(scrollPage);
    if (!target) return;

    const offset = 20;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    const start = window.scrollY;
    const distance = offsetPosition - start;
    const duration = 1500;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, start + distance * progress);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
    setScrollPage("");
  }, [scrollPage]);

  return (
    <div className="smooth-wrapper flex flex-col items-center gap-[2vw] w-full h-screen">
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
            <Link
              to="/login"
              className="typo-par poppins-medium rounded-xl text-white bg-red-900 px-[3vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 duration-300 cursor-pointer"
            >
              Get Started
            </Link>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setScrollPage("about");
              }}
              className="typo-par poppins-medium rounded-xl text-white bg-[#191919] border-2 px-[2vw] py-[1vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 duration-300 cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="illustration flex justify-center items-center w-full h-full">
          <div className="w-[44vw] overflow-clip aspect-square bg-[linear-gradient(to_bottom,rgba(43,41,41,1),rgba(22,22,22,1))] shadow-lg shadow-red-600/40 rounded-full border-red-900/50 border-2 z-0">
            <img
              src="./images/illustrations/model.png"
              alt="model illustration"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        id="about"
        className="feature-section flex flex-col items-center w-full h-fit z-10"
      >
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

        <div className="feature-cards-container flex flex-row justify-between w-full h-fit p-10">
          {/* CARD 1 */}
          <div className="feature-card flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-[2vw] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-[0.7vw] bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
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
          {/* CARD 2 */}
          <div className="feature-card flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-[2vw] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-[0.7vw] bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
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
          {/* CARD 3 */}
          <div className="feature-card flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-[2vw] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-[0.7vw] bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
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
          {/* CARD 4 */}
          <div className="feature-card flex flex-col gap-5 leading-tight w-[24%] h-fit bg-[#191919] p-[2vw] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300">
            <div className="flex w-[25%] aspect-square justify-center items-center p-[0.7vw] bg-[#191919] rounded-xl shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)]">
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

      <section className="w-full  px-[7vw] bg-[#0f0f0f]/60 flex flex-col md:flex-row items-center justify-between gap-20 z-10">
        {/* Left Image */}
        <img
          src="./images/illustrations/card.png"
          alt="Financial habits illustration"
          className="finance-section rounded-2xl w-[30%] object-cover"
        />

        {/* Right Text */}
        <div className="w-full text-left poppins-light">
          <h2 className="slide-right montserrat-bold typo-head text-white mb-6 leading-tight">
            The Science Behind{" "}
            <span className="text-red-900">Smarter Money</span> Habits
          </h2>
          <p className="slide-right text-gray-300 typo-par leading-relaxed mb-6">
            Studies show that people who track their spending weekly are
            <span className="slide-right text-orange-700 font-semibold">
              {" "}
              40% more likely{" "}
            </span>
            to achieve their savings goals. According to the National Endowment
            for Financial Education, consistent awareness of where money goes
            helps reduce anxiety and impulsive spending.
          </p>
          <p className="slide-right text-gray-400 typo-link leading-relaxed">
            Behavioral finance experts from the University of Cambridge also
            note that creating small, gamified challenges around budgeting
            increases engagement and long-term discipline — the very foundation
            of financial stability.
          </p>
          <p className="slide-right text-gray-500 italic mt-6 typo-link">
            — Source: NEFE Research (2024), Cambridge Behavioural Insights Study
            (2023)
          </p>
        </div>
      </section>

      <section className="flex flex-col w-full justify-center item-center text-white gap-[3vw] z-10 p-2">
        <div className="w-full overflow-hidden flex flex-col leading-tight">
          {" "}
          <h1 className="howto-text leading-tight text-center montserrat-bold typo-head">
            Get Started in <br />
            <span className="text-orange-500">Three Simple Steps</span>
          </h1>
          <span className="howto-text typo-par text-gray-300 poppins-light text-center">
            Link your accounts securely with high-level encryption. We support
            over 10,000 financial institutions worldwide.
          </span>
        </div>

        <div className="w-full flex flex-col gap-[1.3vw] items-center">
          <div className="howto-card flex flex-col w-[50%] h-fit bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 rounded-xl p-[2vw]">
            <h2 className="typo-subheader text-white montserrat-bold">
              Login / Register an Account
            </h2>
            <span className="typo-par text-gray-300 poppins-light">
              Link your accounts securely with high-level encryption. We support
              over 10,000 financial institutions worldwide.
            </span>
          </div>
          <div className="howto-card-reverse flex flex-col w-[50%] h-fit bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 rounded-xl p-[2vw]">
            <h2 className="typo-subheader text-white montserrat-bold">Set Your Goals</h2>
            <span className="typo-par text-gray-300 poppins-light">
              Easily budget and set your financial goals with our tools.
            </span>
          </div>
          <div className="howto-card  flex flex-col w-[50%] h-fit bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 rounded-xl p-[2vw]">
            <h2 className="typo-subheader text-white montserrat-bold">Track & Optimize</h2>
            <span className="typo-par text-gray-300 poppins-light">
              Watch your money in real-time. Get recommendations and
              oppurtunities to maximize your savings and reach goals faster.
            </span>
          </div>
        </div>
      </section>

      <section className="w-[80%] h-fit py-[2vw] flex flex-col items-center gap-[2vw] bg-[#191919] rounded-2xl emboss z-10">
        <div className="w-full flex flex-col leading-tight">
          {" "}
          <h1 className="leading-tight text-white text-center montserrat-bold typo-head">
            Ready to Transform <br />
            <span className="text-orange-500">Your Finance?</span>
          </h1>
          <span className="typo-par text-gray-300 poppins-light text-center">
            Join 50,000+ users who have already taken control of their financial
            future
          </span>
        </div>

        <div className="flex flex-row gap-5 mt-5">
          <Link
            to="/login"
            className="typo-par poppins-medium text-white rounded-lg bg-red-900 px-[3vw] py-[0.5vw] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 duration-300 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </section>

      <footer className="w-full bg-[#0f0f0f85] text-gray-400 py-[1vw] mt-20 border-t border-white/30 flex flex-col items-center justify-center z-10">
        <h2 className="text-white montserrat-bold typo-sub">Pennywise</h2>
        <p className="typo-par text-gray-500 text-center">
          Smart money management made simple. Track, plan, and grow — all in one
          place.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-orange-500 transition-all">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-500 transition-all">
            Terms
          </a>
          <a href="#" className="hover:text-orange-500 transition-all">
            Support
          </a>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Pennywise. All rights reserved. 🤡
        </p>
      </footer>
      <BackgroundParticles />
      <BackgroundCircle></BackgroundCircle>
    </div>
  );
}
