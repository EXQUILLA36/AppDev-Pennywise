import React from "react";
import { useAccount } from "@/utils/account";
import { Sparkles, TrendingUp, SquareArrowOutUpRight } from "lucide-react";

export default function Marketplace() {
  const account = useAccount();

  if (!account) return;
  return (
    <div className="flex flex-col gap-10 p-5">
      <section className="w-[60%] flex flex-col gap-2 justify-between">
        <div className="flex gap-2 items-center shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] bg-[#191919] py-[0.5vw] px-[1vw] text-orange-500 montserrat-medium typo-par w-fit rounded-lg">
          <Sparkles size={24} color="#e85b09" /> Exclusive Saving Oppurtunities
        </div>
        <section className="leading-tight overflow-hidden">
          <h1 className="dashboard-header typo-head montserrat-bold text-white">
            Discover the Best{" "}
            <span className="text-red-500">Savings Offer</span>
          </h1>
          <h2 className="dashboard-header typo-par">
            Maximize your savings with handpicked offers from top financial
            institutions. Compare rates, bonuses, and features to find the
            perfect fit for your goals.
          </h2>
        </section>
      </section>

      <section className="flex flex-row gap-[2vw] justify-between">
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row gap-5 justify-between items-center">
            <div className="w-[10%] p-3 rounded-lg flex items-center justify-center aspect-square emboss">
              <TrendingUp size={32} color="red" />
            </div>
            <div className="w-full flex flex-col montserrat-medium">
              <h1 className="montserrat-bold typo-subheader text-red-500">
                4.50%
              </h1>
              <span>TOP APY</span>
            </div>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row gap-5 justify-between items-center">
            <div className="w-[10%] p-3 rounded-lg flex items-center justify-center aspect-square emboss">
              <TrendingUp size={32} color="#e85b09" />
            </div>
            <div className="w-full flex flex-col montserrat-medium">
              <h1 className="montserrat-bold typo-subheader text-orange-600">
                P300
              </h1>
              <span>Max Bonus</span>
            </div>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row gap-5 justify-between items-center">
            <div className="w-[10%] p-3 rounded-lg flex items-center justify-center aspect-square emboss">
              <Sparkles size={32} color="#e85b09" />
            </div>
            <div className="w-full flex flex-col montserrat-medium">
              <h1 className="montserrat-bold typo-subheader">4</h1>
              <span>Live Offers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="dashboard-header montserrat-bold text-white">
          Featured Offers
        </h1>

        <div className="w-full flex flex-row gap-[2vw] justify-between">
          <div className="flex flex-col gap-[1vw] p-[2vw] bg-linear-to-br from-[#32050e83] to-[#8b4f0085] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-[50%] h-fit rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                Maya Bank
              </span>
              <span className="bg-orange-500 px-[1vw] p-[0.2vw] montserrat-medium rounded-lg emboss">
                Featured
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-sub">Maya Savings</h1>
              <h1 className="montserrat-bold text-red-500 typo-subheader">
                15.00% APY
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Maya Savings is regulated by the Bangko Sentral ng Pilipinas.
              Deposits are insured by PDIC up to ₱1,000,000 per depositor.
            </span>

            <ul class="space-y-1">
              <h1 className="typo-par montserrat-bold">Key Features</h1>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Get started with
                just 1 ID and no minimum balance
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Easy deposits and
                free transfers
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>All-in-one digital
                bank
              </li>
            </ul>

            <a
              href="https://www.mayabank.ph/savings/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-500 p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>

          <div className="flex flex-col gap-[1vw] p-[2vw] bg-linear-to-tl from-[#32050e83] to-[#8b4f0085] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-[50%] h-fit rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                GoTyme Bank
              </span>
              <span className="bg-orange-500 px-[1vw] p-[0.2vw] montserrat-medium rounded-lg emboss">
                Featured
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-sub">GoTyme Go Save</h1>
              <h1 className="montserrat-bold text-red-500 typo-subheader">
                4.00% APY
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Diversify your savings with a time deposit in another currency,
              starting with the US Dollar. More currencies coming soon.
            </span>

            <ul class="space-y-1">
              <h1 className="typo-par montserrat-bold">Key Features</h1>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Multi-Currency
                Time Deposit
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Fund your savings
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Withdraw when you
                need to
              </li>
            </ul>

            <a
              href="https://www.gotyme.com.ph/save-and-invest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-500 p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="dashboard-header montserrat-bold text-white">
          More Savings Oppurtunity
        </h1>

        <div className="w-full grid grid-cols-3 gap-[2vw] justify-between">
          <div className="flex flex-col gap-[1vw] p-[2vw] bg-linear-to-tl from-[#38010c41] to-[#83380386] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-full h-full rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                MariBank
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-sub">
                MariBank savings Account
              </h1>
              <h1 className="montserrat-bold text-red-500 typo-subheader">
                3.50% APY
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Simple savings with competitive rates and no hidden fees
            </span>

            <ul class="space-y-1">
              <h1 className="typo-par montserrat-bold">Key Features</h1>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Earn High
                Interest, Credited Daily Time Deposit
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Experience Easy
                Account Opening
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>No Maintaining
                Balance and Hassle-Free need to
              </li>
            </ul>

            <a
              href="https://www.gotyme.com.ph/save-and-invest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-500 p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>

          <div className="flex flex-col gap-[1vw] p-[2vw] bg-linear-to-tl from-[#38010c41] to-[#83380386] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-full h-full rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                BPI
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-sub">BPI Saver-Plus</h1>
              <h1 className="montserrat-bold text-red-500 typo-subheader">
                0.60% APY
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Secure, manage, and grow your funds conveniently
            </span>

            <ul class="space-y-1">
              <h1 className="typo-par montserrat-bold">Key Features</h1>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>BPI Reward Points
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Lifestyle Reward
                Benefits
              </li>
              <li class="flex items-center">
                <span class="text-orange-500 w-[1vw]">•</span>Online Account
                Opening
              </li>
            </ul>

            <a
              href="https://www.bpi.com.ph/personal/bank/savings-accounts/saver-plus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-500 p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="dashboard-header montserrat-bold text-white">
          Investment Oppurtunities
        </h1>

        <div className="w-full flex flex-row gap-[2vw] justify-between">

          <div className="flex flex-col gap-[1vw] p-[2vw] bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-[50%] h-fit rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                Wealthfront
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-subheader">
                Automated Investing
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Diversified portfolio management with tax-loss harvesting
            </span>

            <div className="w-full flex flex-row justify-between text-gray-400">
              <span className="poppins-light typo-par">
                Minimum:
              </span>
              <span className="poppins-light typo-par">
                Php 500
              </span>
            </div>

            <a
              href="https://geekprank.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#191919] p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>

          <div className="flex flex-col gap-[1vw] p-[2vw] bg-[#191919] shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-101 transition-all duration-300 w-[50%] h-fit rounded-2xl">
            <div className="w-full flex flex-row items-center justify-between ">
              <span className="montserrat-bold text-gray-400 typo-par">
                Betterment
              </span>
            </div>

            <div className="flex flex-col leading-tight w-full">
              <h1 className="montserrat-bold typo-subheader">
                Smart Portfolio
              </h1>
            </div>

            <span className="poppins-light typo-par">
              Goal-based investing with automatic rebalancing
            </span>

            <div className="w-full flex flex-row justify-between text-gray-400">
              <span className="poppins-light typo-par">
                Minimum:
              </span>
              <span className="poppins-light typo-par">
                Php 1000
              </span>
            </div>

            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#191919] p-2 rounded-lg emboss poppins-medium hover:scale-105 duration-300 cursor-pointer text-white"
            >
              Learn More <SquareArrowOutUpRight size={16} />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
