import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Wallet } from "lucide-react";
import { Source } from "three";

export async function addUserToFirestore(user) {
  try {
    const userRef = doc(db, "users", user.clerkId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        clerk_id: user.clerkId,
        full_name: user.fullName,
        email: user.email,
        incomeSource: [],
        expenseSource: [],
        wallet: {
            total_balance: 10,
            total_income: 10,
            total_expenses: 10,
            total_savings: 10,
        }
      });
      console.log("✅ User added to Firestore:", user.fullName);
    } else {
      console.log("ℹ️ User already exists in Firestore");
    }
  } catch (error) {
    console.error("❌ Error adding user to Firestore:", error);
  }
  return "accountProccessed";
}
