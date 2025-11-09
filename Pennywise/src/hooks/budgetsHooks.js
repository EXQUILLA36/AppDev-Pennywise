import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useBudgets(ClerkId) {
  const [budgets, setBudgets] = useState([]);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ClerkId) return;

    const userRef = doc(db, "users", ClerkId);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const userBudgets = data.budgets || [];
          setBudgets(userBudgets);

          // ✅ Calculate totals
          const allocatedTotal = userBudgets.reduce(
            (sum, b) => sum + Number(b.amountAllocated || 0),
            0
          );

          const usedTotal = userBudgets.reduce(
            (sum, b) => sum + Number(b.amountUsed || 0),
            0
          );

          setTotalAllocated(allocatedTotal);
          setTotalUsed(usedTotal);
        } else {
          setBudgets([]);
          setTotalAllocated(0);
          setTotalUsed(0);
        }

        setLoading(false);
      },
      (err) => {
        console.error("Error fetching budgets:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ClerkId]);

  return { budgets, totalAllocated, totalUsed, loading, error };
}
