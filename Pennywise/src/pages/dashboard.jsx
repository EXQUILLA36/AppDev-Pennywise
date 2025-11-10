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
  const [growth, setGrowth] = useState(0);
  const [incomeExpenseRatio, setIncomeExpenseRatio] = useState(0);
  const [balanceRatio, setBalanceRatio] = useState(0);

  // *LOGS
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

        const unsubscribe = onSnapshot(userRef, async (docSnap) => {
          if (!docSnap.exists()) return;

          const data = docSnap.data();
          setUserData(data);
          setWalletContent(data.wallet);
          setIncomeSources(data.incomeSource || []);
          setExpenseSources(data.expenseSource || []);

          // --- 30-DAY CHECK ---
          const now = new Date();
          const lastUpdated = data.previousBalance?.lastUpdated
            ? new Date(data.previousBalance.lastUpdated)
            : null;
          const thirtyDays = 30 * 24 * 60 * 60 * 1000;
          const needsUpdate = !lastUpdated || now - lastUpdated >= thirtyDays;

          if (needsUpdate) {
            try {
              await updateDoc(userRef, {
                "previousBalance.amount": data.wallet.total_balance,
                "previousBalance.lastUpdated": now.toISOString(),
              });
              console.log("📆 Previous balance snapshot updated.");
            } catch (err) {
              console.error("Failed to update previous balance:", err);
            }
          }

          // --- GROWTH CALCULATION ---
          const current = data.wallet.total_balance;
          const previous = data.previousBalance?.amount || 0;

          let perc = 0;
          perc = ((current - previous) / previous / 30) * 100;

          setGrowth(perc);

          const spendingToEarningRatio =
            data.wallet.total_income > 0
              ? (data.wallet.total_expenses / data.wallet.total_income) * 100
              : 0;
          const balanceRatio =
            data.wallet.total_income > 0
              ? (data.wallet.total_balance / data.wallet.total_income) * 100
              : 0;

          setIncomeExpenseRatio(spendingToEarningRatio);
          setBalanceRatio(balanceRatio);
          setPageLoading(false);
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
            <span className={growth >= 0 ? "text-orange-400" : "text-red-500"}>
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(2)}% since last month
            </span>
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
            <span
              className={`text-lg ${
                incomeExpenseRatio >= 100 ? "text-green-400" : "text-red-500"
              }`}
            >
              {incomeExpenseRatio.toFixed(2)}%
            </span>
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
            <span
              className={
                incomeExpenseRatio > 100
                  ? "text-red-500"
                  : incomeExpenseRatio > 80
                  ? "text-orange-400"
                  : "text-green-400"
              }
            >
              {incomeExpenseRatio.toFixed(2)}% of your income spent
            </span>
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
