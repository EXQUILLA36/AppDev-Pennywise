import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useSource(clerkId) {
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);

  useEffect(() => {
    if (!clerkId) return; // skips if clerkId not ready
    console.log("SOURCES HOOK");

    const userRef = doc(db, "users", clerkId);
    console.log("Setting up Firestore snapshot for:", clerkId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIncomeSources(data.incomeSources || []);
        setExpenseSources(data.expensesSources|| []);
        console.log("🟢 INCOME fetched:", data.incomeSource || []);
        console.log("🟢 EXPENSE fetched:", data.expenseSource || []);
      } else {
        setIncomeSources([]);
        setExpenseSources([]);
        console.log("⚠️ No transactions found");
      }
    });

    // cleanup function
    return () => unsubscribe();
  }, [clerkId]);

  return { incomeSources, expenseSources };
}
