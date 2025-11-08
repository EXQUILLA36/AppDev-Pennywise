import React, { useState, useEffect, useRef } from "react";
import { useAccount } from "@/utils/account";
import BudgetEditor from "@/components/modules/budgetEditor";

import { getUserFromFirestore } from "@/firebase/getUSer";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Budget() {
  const account = useAccount();
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);
  const [transactions, setTransations] = useState([]);

  useEffect(() => {
    try {
      if (account) {
        const userRef = doc(db, "users", account.clerkId);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTransations(data.transactions);
            setExpenseSources(data.expenseSource || {});
            setIncomeSources(data.incomeSource || []);
          } else {
          }
        });

        return () => unsubscribe();
      }
    } catch (err) {
      console.error("❌ Error processing account:", err);
    }

    async function fetchUserData() {
      if (account) {
        const data = await getUserFromFirestore(account.clerkId);
        setTransations(data.transactions);
        setExpenseSources(data.expenseSource);
        setIncomeSources(data.incomeSource);
      }
    }
    fetchUserData();
  }, [account]);

  useEffect(() => {
    try {
      if (account) {
        const userRef = doc(db, "users", account.clerkId);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTransations(data.transactions);
            setExpenseSources(data.expenseSource || {});
            setIncomeSources(data.incomeSource || []);
            console.log("🔁 Firestore updated:", data);
          } else {
            console.warn("⚠️ User document does not exist yet!");
          }
        });

        // Cleanup when component unmounts or account changes
        return () => unsubscribe();
      }
    } catch (err) {
      console.error("❌ Error processing account:", err);
    }

    async function fetchUserData() {
      if (account) {
        const data = await getUserFromFirestore(account.clerkId);
        setTransations(data.transactions);
        setExpenseSources(data.expenseSource);
        setIncomeSources(data.incomeSource);
      }
    }
    fetchUserData();
  }, [account]);

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
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5">
      <section className="w-full flex flex-row justify-between">
        <section className="leading-tight overflow-hidden">
          <h1 className="dashboard-header montserrat-bold text-white">
            Budgets
          </h1>
          <h2 className="dashboard-header">
            Manage and edit your sources and budgets here.
          </h2>
        </section>
        {account ? (
          <BudgetEditor
            ClerkId={account.clerkId}
            IncomeSource={incomeSources}
            ExpenseSource={expenseSources}
          ></BudgetEditor>
        ) : null}
      </section>

      <section className="flex flex-col gap-3 w-full h-fit p-[1vw] bg-[#191919] emboss rounded-lg">
        <h1 className="typo-sub montserrat-bold text-white">
          Overall Budget Performance
        </h1>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <span className="text-gray-400">Total Spent</span>
            <span className="montserrat-medium">P 1000 / 20000</span>
          </div>
          <div className="w-full h-[0.5vw] rounded-full bg-red-500"></div>
        </div>
        <span className="text-orange-500">
          50% of total budget has been used
        </span>
      </section>

      <secti1n className="grid grid-cols-3 gap-5 w-full overflow-y-auto custom-scrollbar h-[25vw] p-[1vw] rounded-lg">
        <div className="flex flex-col gap-[1vw] w-full h-fit bg-[#191919] emboss rounded-lg p-[1vw]">
          <h1 className="typo-sub montserrat-bold text-white">Food</h1>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <span className="text-gray-400">Total Spent</span>
              <span className="montserrat-medium">P 1000 / 20000</span>
            </div>
            <div className="w-full h-[0.5vw] rounded-full bg-red-500"></div>
          </div>
          <div className="w-full flex gap-2">
            <span className="text-gray-400">Remaining</span>
            <span className="montserrat-medium">P 500</span>
          </div>
        </div>
      </secti1n>
    </div>
  );
}
