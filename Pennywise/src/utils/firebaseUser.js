import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import transactions from "@/pages/transactions";

export async function addUserToFirestore(user) {
  try {
    const userRef = doc(db, "users", user.clerkId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // Create new document
      await setDoc(userRef, {
        clerk_id: user.clerkId,
        username: user.username,
        full_name: user.fullName,
        email: user.email,
        incomeSource: ["Salary", "Allowance", "Bonus", "Scholarship"],
        expenseSource: ["Utilities", "Transportation", "Food/Groceries"],
        transactions: [],
        budgets: [],
        wallet: {
          total_balance: 0,
          total_income: 0,
          total_expenses: 0,
          total_budget: 0,
        },
        previousBalance: {
          amount: 0,
          lastUpdated: null,
        },
      });
    } else {
      // Update existing document with new fields (without overwriting old data)
      await setDoc(userRef, {
        // Optional: update name/email if changed
        full_name: user.fullName,
        username: user.username,
        email: user.email,
        incomeSource: userSnap.data().incomeSource || ["Salary", "Allowance", "Bonus", "Scholarship"],
        expenseSource: userSnap.data().expenseSource || ["Utilities", "Transportation", "Food/Groceries"],
        transactions: userSnap.data().transactions,
        budgets: userSnap.data().budgets || [],
        wallet: userSnap.data().wallet || {
          total_balance: 0,
          total_income: 0,
          total_expenses: 0,
          total_budget: 0,
        },
        previousBalance: userSnap.data().previousBalance || {
          amount: 0,
          lastUpdated: null,
        },
      }, { merge: true });
    }
  } catch (error) {
    console.error("Error adding/updating user in Firestore:", error);
  }
  return "accountProccessed";
}
