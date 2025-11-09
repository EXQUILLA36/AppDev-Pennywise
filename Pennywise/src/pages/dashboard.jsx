import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useUser } from "@clerk/clerk-react";
import { useGSAP } from "@gsap/react";
import { useAccount } from "../utils/account";
import { addUserToFirestore } from "../utils/firebaseUser";
import { getUserFromFirestore } from "../firebase/getUSer";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { db } from "../firebase/firebase";
import BalanceEditor from "@/components/modules/balanceEditor";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useTransactions } from "@/hooks/transactionHook";
import gsap from "gsap";
import { useBudgets } from "@/hooks/budgetsHooks";

export default function Dashboard() {
  const navigate = useNavigate();
  const account = useAccount();
  const [userData, setUserData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // *WALLET
  const [walletContent, setWalletContent] = useState({});
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);
  const [dailyChange, setDailyChange] = useState(0);

  const { transactions, loading: transactionsLoading } = useTransactions(
    userData?.clerk_id
  );
  const { budgets, totalAllocated, totalUsed, loading } = useBudgets(
    account?.clerkId
  );

  //* Add user to Firestore on account change
  useEffect(() => {
    async function processAccount() {
      try {
        if (account) {
          const status = await addUserToFirestore(account);
          if (status === "accountProccessed") {
            fetchUserData();
          }
        }

        const userRef = doc(db, "users", account.clerkId);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setWalletContent(data.wallet);
            setIncomeSources(data.incomeSource || []);
            setExpenseSources(data.expenseSource || []);
          }
        });
        return () => unsubscribe();
      } catch (err) {
        console.error("Error processing account:", err);
      }
    }

    processAccount();

    async function fetchUserData() {
      if (account) {
        const data = await getUserFromFirestore(account.clerkId);
        setUserData(data);
        setWalletContent(data.wallet);
      }
      setPageLoading(false);
    }
  }, [account]);

  console.log("LOADING STATE:", pageLoading);

  // useEffect(() => {
  //   if (!userData || !walletContent?.total_balance) return;

  //   const today = new Date().toISOString().split("T")[0];
  //   const yesterday = new Date(Date.now() - 86400000)
  //     .toISOString()
  //     .split("T")[0];

  //   // If there's no balanceHistory, create an empty one
  //   const history = userData.balanceHistory || {};

  //   // Only store today's balance once per day
  //   if (userData.lastUpdated !== today) {
  //     const userRef = doc(db, "users", account.clerkId);

  //     updateDoc(userRef, {
  //       [`balanceHistory.${today}`]: walletContent.total_balance,
  //       lastUpdated: today,
  //     })
  //       .then(() =>
  //         console.log(
  //           `✅ Stored today's balance: ${walletContent.total_balance}`
  //         )
  //       )
  //       .catch((err) =>
  //         console.error("❌ Failed to update balanceHistory:", err)
  //       );
  //   }

  //   // Now calculate gain/loss % from yesterday to today
  //   const yesterdayBalance = history[yesterday] || walletContent.total_balance;
  //   const todayBalance = walletContent.total_balance;
  //   const percentChange =
  //     yesterdayBalance > 0
  //       ? ((todayBalance - yesterdayBalance) / yesterdayBalance) * 100
  //       : 0;

  //   setDailyChange(percentChange.toFixed(2)); // ← use a state to display later
  // }, [userData, walletContent]);

  // console.log("PERCENTAGE CHANGE:".percentChange);

  // useEffect(() => {
  //   if (!transactionsLoading) {
  //     console.log("Transactions fetched:", transactions);
  //   }
  // }, [transactions, transactionsLoading]);

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
      duration: 1.2,
      stagger: 0.1,
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
      <section className="w-full flex flex-row justify-between">
        <section className="leading-tight overflow-hidden">
          <h1 className="dashboard-header montserrat-bold text-white">
            Dashboard
          </h1>
          <h2 className="dashboard-header">
            {userData
              ? `Welcome ${userData.full_name}! Here's your financial overview`
              : "Welcome! Here's your financial overview"}
          </h2>
        </section>
        {!pageLoading ? (
          <BalanceEditor
            ClerkId={account.clerkId}
            IncomeSource={incomeSources}
            ExpenseSource={expenseSources}
          />
        ) : (
          <button className="shimmer h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-orange-400 duration-300 cursor-pointer">
            Loading Datas
          </button>
        )}
      </section>

      <section className="flex flex-row gap-[1vw] justify-between">
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Total Balance</span>
            <img src="./images/icons/dashboardIcons/wallet.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold flex flex-row gap-2 items-center typo-subheader">
              <span className="montserrat-bold">₱</span>{" "}
              {pageLoading ? (
                <div className="shimmer flex w-full h-10 rounded-2xl"></div>
              ) : (
                walletContent.total_balance
              )}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Income</span>
            <img
              src="./images/icons/dashboardIcons/arrow-up-right.svg"
              alt=""
            />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold flex flex-row gap-2 items-center typo-subheader">
              <span className="montserrat-bold">₱</span>{" "}
              {pageLoading ? (
                <div className="shimmer flex w-full h-10 rounded-2xl"></div>
              ) : (
                walletContent.total_income
              )}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Expenses</span>
            <img
              src="./images/icons/dashboardIcons/arrow-down-right.svg"
              alt=""
            />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold flex flex-row gap-2 items-center typo-subheader">
              <span className="montserrat-bold">₱</span>{" "}
              {pageLoading ? (
                <div className="shimmer flex w-full h-10 rounded-2xl"></div>
              ) : (
                walletContent.total_expenses
              )}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Budget</span>
            <img src="./images/icons/dashboardIcons/trending-up.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold flex flex-row gap-2 items-center typo-subheader">
              <span className="montserrat-bold">₱</span>{" "}
              {pageLoading ? (
                <div className="shimmer flex w-full h-10 rounded-2xl"></div>
              ) : (
                totalAllocated
              )}
            </h1>
            <span className="text-amber-600">
              {totalAllocated > 0
                ? `${((totalUsed / totalAllocated) * 100).toFixed(
                    1
                  )}% of total budget has been used`
                : "No budget allocated yet"}
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-10 justify-between">
        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Recent Transactions</h1>

          <div
            className={
              pageLoading
                ? "shimmer rounded-xl flex flex-col gap-2 w-full h-[90vw] overflow-y-auto custom-scrollbar"
                : "flex flex-col gap-2 w-full h-[90vw] overflow-y-auto custom-scrollbar"
            }
          >
            {transactions
              .slice(-4)
              .reverse()
              .map((transactions, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between montserrat-bold w-full h-fit p-2"
                >
                  <div className="flex flex-col leading-tight">
                    <h2 className="typo-sub">{transactions.type}</h2>
                    <span className="montserrat-light">
                      {transactions.date}
                    </span>
                  </div>
                  <div className="flex flex-col text-right leading-tight">
                    <h2
                      className={`typo-sub ${
                        transactions.type === "Expense"
                          ? "text-red-500"
                          : "text-amber-500"
                      }`}
                    >
                      {transactions.type === "Expense"
                        ? `- ₱${transactions.amount}`
                        : `₱${transactions.amount}`}
                    </h2>
                    <span className="montserrat-light">
                      {transactions.source}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={() => navigate("/transactions")}
            className="bg-[#191919] p-[0.5vw] rounded-sm shadow-[-4px_-4px_10px_rgba(255,255,255,0.1),5px_4px_15px_rgba(0,0,0,7)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-500 cursor-pointer"
          >
            View Transactions
          </button>
        </section>

        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Budget Overview</h1>
          <div className="flex flex-col w-full h-[90vw] overflow-y-auto">
            {budgets
              .slice()
              .sort((a, b) => b.amountUsed - a.amountUsed)
              .slice(0, 3)
              .map((budget, index) => {
                const percentage =
                  (budget.amountUsed / budget.amountAllocated) * 100;
                const barColor = `hsl(${
                  35 - Math.min(percentage, 100) * 0.35
                }, 90%, 50%)`;

                return (
                  <div
                    key={index}
                    className="flex flex-col gap-1 w-full h-fit p-2 bg-[#191919] rounded-lg"
                  >
                    {/* Header */}
                    <div className="flex flex-row items-center justify-between w-full leading-tight">
                      <h2 className="typo-sub">{budget.budgetSource}</h2>
                      <span className="montserrat-medium text-sm text-gray-300">
                        ₱{budget.amountUsed.toLocaleString()} / ₱
                        {budget.amountAllocated.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-[#282828] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      ></div>
                    </div>

                    {/* Percentage text */}
                    <span className="text-sm text-orange-400">
                      {percentage.toFixed(1)}% of budget used
                    </span>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => navigate("/budget")}
            className="bg-[#191919] p-[0.5vw] rounded-sm shadow-[-4px_-4px_10px_rgba(255,255,255,0.1),5px_4px_15px_rgba(0,0,0,7)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-500 cursor-pointer"
          >
            View All Budgets
          </button>
        </section>
      </section>
    </div>
  );
}
