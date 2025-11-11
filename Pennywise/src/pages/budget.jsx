import React, { useState, useEffect, useRef } from "react";
import { useAccount } from "@/utils/account";
import BudgetEditor from "@/components/modules/budgetEditor";
import { useBudgets } from "@/hooks/budgetsHooks";

import { getUserFromFirestore } from "@/firebase/getUSer";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Icon from "@/components/modules/iconLoader";

export default function Budget() {
  const account = useAccount();
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);
  const [transactions, setTransations] = useState([]);
  const { budgets, totalAllocated, totalUsed, loading } = useBudgets(
    account?.clerkId
  );

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
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5 text-white">
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
        <div className="overflow-hidden">
          <h1 className="dashboard-item typo-sub montserrat-bold text-white">
            Overall Budget Performance
          </h1>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between overflow-y-hidden">
            <span className="text-gray-400 dashboard-item">Total Spent</span>
            <span className="montserrat-medium dashboard-item">
              P {totalUsed} / {totalAllocated}
            </span>
          </div>
          <div className="w-full h-[0.5vw] rounded-full bg-[#282828]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((totalUsed / totalAllocated) * 100, 100)}%`,
                backgroundColor: `hsl(${Math.max(
                  0,
                  35 - (totalUsed / totalAllocated) * 35
                )}, 90%, 50%)`, // smooth orange → red
              }}
            ></div>
          </div>
        </div>
        <span className="text-orange-500 mt-1">
          {totalAllocated > 0
            ? `${((totalUsed / totalAllocated) * 100).toFixed(
                1
              )}% of total budget has been used`
            : "No budget allocated yet"}
        </span>
      </section>

      <section className="dashboard-item grid grid-cols-3 gap-5 w-full overflow-y-auto custom-scrollbar h-[25vw] p-[1vw] rounded-lg text-white">
        {budgets.length === 0 ? (
          <p className="text-gray-400">No existing budgets</p>
        ) : (
          budgets.map((budget, index) => (
            <div
              key={index}
              className="flex flex-col gap-[1vw] w-full h-fit bg-[#191919] text-white dsahboard-item emboss rounded-lg p-[1vw]"
            >
              <div className="flex flex-row gap-3 items-center">
                <Icon name={budget.icons} size={"1.5vw"} color="orange" />
                <h1 className="typo-sub montserrat-bold text-white">
                  {budget.budgetSource}
                </h1>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between">
                  <span className="text-gray-400">Total Spent</span>
                  <span className="montserrat-medium">
                    P {budget.amountUsed} / {budget.amountAllocated}
                  </span>
                </div>
                <div className="w-full h-[0.5vw] rounded-full bg-[#282828] overflow-hidden">
                  {(() => {
                    const usedPercentage =
                      (budget.amountUsed / budget.amountAllocated) * 100;

                    const interpolateColor = (percent) => {
                      const r = 220;
                      const g = Math.round(120 - (120 * percent) / 100); //
                      const b = 40;
                      return `rgb(${r},${g},${b})`;
                    };

                    return (
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${usedPercentage}%`,
                          backgroundColor: interpolateColor(usedPercentage),
                          transition: "width 0.3s, background-color 0.3s",
                        }}
                      ></div>
                    );
                  })()}
                </div>
              </div>

              <div className="w-full flex flex-row justify-between">
                <div className="flex gap-2">
                  <span className="text-gray-400">Remaining</span>
                  <span className="montserrat-medium">
                    P {budget.amountAllocated - budget.amountUsed}
                  </span>
                </div>
                <span className="montserrat-medium">{budget.resets}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
