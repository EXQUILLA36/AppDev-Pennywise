import React, { use } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Dashboard() {

  useGSAP(() => {
    gsap.from(".dashboard-header", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
    });
    gsap.from(".dashboard-item", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power4.inOut",
    });
    gsap.from(".dashboard-item2", {
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5">
      <section className="leading-tight overflow-hidden">
        <h1 className="dashboard-header montserrat-bold text-white">Dashboard</h1>
        <h2 className="dashboard-header">Welcome back! Here's your financial overview</h2>
      </section>

      <section className="flex flex-row gap-[1vw] justify-between">
        <div className="dashboard-item flex flex-col w-full h-[10vw] p-[2vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold">Total Balance</span>
            <img src="./images/icons/dashboardIcons/wallet.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold">$12,000.00</h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-[10vw] p-[2vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold">Income</span>
            <img src="./images/icons/dashboardIcons/arrow-up-right.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold">$12,000.00</h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-[10vw] p-[2vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold">Expenses</span>
            <img src="./images/icons/dashboardIcons/arrow-down-right.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold">$12,000.00</h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-[10vw] p-[2vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold">Savings</span>
            <img src="./images/icons/dashboardIcons/trending-up.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold">$12,000.00</h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-10 justify-between">
        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Recent Transactions</h1>
          <div className="flex flex-col gap-2 w-full h-[90vw] overflow-y-auto">
            <div className="flex flex-row justify-between montserrat-bold w-full h-fit p-2">
              <div className="flex flex-col leading-tight">
                <h2 className="typo-sub">Grocery</h2>
                <span className="montserrat-medium">today</span>
              </div>
              <div className="flex flex-col text-right leading-tight">
                <h2 className="typo-sub">-$125</h2>
                <span className="montserrat-medium">food</span>
              </div>
            </div>
          </div>
          <button className="bg-[#191919] p-[0.5vw] rounded-sm emboss">
            View Transactions
          </button>
        </section>

        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Budget Overview</h1>
          <div className="flex flex-col w-full h-[90vw] overflow-y-auto">
            <div className="flex flex-row justify-between montserrat-bold w-full h-fit p-2">
              <div className="flex flex-row items-center justify-between w-full leading-tight">
                <h2 className="typo-sub">Grocery</h2>
                <span className="montserrat-medium">$400 / $600</span>
              </div>
            </div>
            <div className="w-full h-[0.5rem] bg-orange-400 rounded-full"></div>
          </div>
          <button className="bg-[#191919] p-[0.5vw] rounded-sm emboss">
            View Transactions
          </button>
        </section>
      </section>
    </div>
  );
}
