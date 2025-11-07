import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useUser } from "@clerk/clerk-react";
import { useGSAP } from "@gsap/react";
import { useAccount } from "../utils/account";
import { addUserToFirestore } from "../utils/firebaseUser";
import { getUserFromFirestore } from "../firebase/getUSer";
import { doc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { db } from "../firebase/firebase";
import BalanceEditor from "@/components/modules/balanceEditor";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useTransactions } from "@/hooks/transactionHook";

import gsap from "gsap";

export default function Dashboard() {
  const navigate = useNavigate();
  const account = useAccount();
  const [userData, setUserData] = useState(null);

  // *WALLET
  const [walletContent, setWalletContent] = useState({});
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);

  const { transactions, loading: transactionsLoading } = useTransactions(
    userData?.clerk_id
  );

  //* Add user to Firestore on account change
  useEffect(() => {
    async function processAccount() {
      try {
        if (account) {
          console.log("🟢 Adding user to Firestore:", account);
          const status = await addUserToFirestore(account);
          if (status === "accountProccessed") {
            console.log("🟢 Fetching user data from Firestore");
            fetchUserData();
          }
        } else {
          console.log("🔴 No account yet");
        }

        const userRef = doc(db, "users", account.clerkId);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setWalletContent(data.wallet);
            setIncomeSources(data.incomeSource || []);
            setExpenseSources(data.expenseSource || []);
            console.log("🔁 Firestore updated:", data);
          } else {
            console.warn("⚠️ User document does not exist yet!");
          }
        });

        // Cleanup when component unmounts or account changes
        return () => unsubscribe();
      } catch (err) {
        console.error("❌ Error processing account:", err);
      } finally {
        setLoading(false);
      }
    }

    processAccount();

    async function fetchUserData() {
      if (account) {
        const data = await getUserFromFirestore(account.clerkId);
        setUserData(data);
        console.log(data)
        setWalletContent(data.wallet);
      }
    }
  }, [account]);

  useEffect(() => {
    if (!transactionsLoading) {
      console.log("Transactions fetched:", transactions);
    }
  }, [transactions, transactionsLoading]);

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
        {userData ? (
          <BalanceEditor
            ClerkId={account.clerkId}
            IncomeSource={incomeSources}
            ExpenseSource={expenseSources}
          />
        ) : null}
      </section>

      <section className="flex flex-row gap-[1vw] justify-between">
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Total Balance</span>
            <img src="./images/icons/dashboardIcons/wallet.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              <span className="montserrat-bold">₱</span> {walletContent.total_balance}
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
            <h1 className="poppins-bold typo-subheader">
              <span className="montserrat-bold">₱</span> {walletContent.total_income}
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
            <h1 className="poppins-bold typo-subheader">
              <span className="montserrat-bold">₱</span> {walletContent.total_expenses}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Savings</span>
            <img src="./images/icons/dashboardIcons/trending-up.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              <span className="montserrat-bold">₱</span> {walletContent.total_savings}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-10 justify-between">
        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Recent Transactions</h1>

          <div className="flex flex-col gap-2 w-full h-[90vw] overflow-y-auto">
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

          <button onClick={() => navigate("/transactions")} className="bg-[#191919] p-[0.5vw] rounded-sm shadow-[-4px_-4px_10px_rgba(255,255,255,0.1),5px_4px_15px_rgba(0,0,0,7)] hover:shadow-[inset_-1px_-1px_5px_rgba(255,255,255,0.3),inset_5px_4px_5px_rgba(0,0,0,1)] hover:scale-102 transition-all duration-500 cursor-pointer">
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
