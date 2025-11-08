import React, { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useAccount } from "@/utils/account";
import { useTransactions } from "@/hooks/transactionHook";
import { useGSAP } from "@gsap/react";
import { columns } from "@/components/modules/columns";
import { DataTable } from "@/components/modules/data-table";
import { getUserFromFirestore } from "@/firebase/getUSer";
import BalanceEditor from "@/components/modules/balanceEditor";
import gsap from "gsap";

export default function transactions() {
  const modal = useRef(null);
  const [openModal, setOpenModal] = useState(false);
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
            Transactions
          </h1>
          <h2 className="dashboard-header">
            Track and manage all you financial transactions
          </h2>
        </section>
        {account ? (
          <BalanceEditor
            ClerkId={account.clerkId}
            IncomeSource={incomeSources}
            ExpenseSource={expenseSources}
          />
        ) : null}
      </section>

      <section className="flex flex-col gap-3 w-full h-[37vw] p-[1vw] bg-[#191919] rounded-xl emboss">
        <DataTable columns={columns} data={transactions} />
      </section>

      <dialog
        ref={modal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop:bg-black/50"
      >
        <div className="w-full h-full bg-white rounded-xl flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl font-bold">Hi</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="bg-orange-500 py-2 px-5 text-white rounded-lg hover:bg-orange-400 duration-300"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
