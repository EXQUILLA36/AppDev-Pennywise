import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useTransactions(clerkId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clerkId) return; // skips if clerkId not ready
    console.log("TRANSACTION HOOK");

    const userRef = doc(db, "users", clerkId);
    console.log("Setting up Firestore snapshot for:", clerkId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTransactions(data.transactions || []);
        console.log("🟢 Transactions fetched:", data.transactions || []);
      } else {
        setTransactions([]);
        console.log("⚠️ No transactions found");
      }
      setLoading(false);
    });

    // cleanup function
    return () => unsubscribe();
  }, [clerkId]);

  return { transactions, loading };
}
