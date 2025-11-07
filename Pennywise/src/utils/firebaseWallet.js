import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Deposit
export async function depositToWallet(userId, amount) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    "wallet.balance": increment(amount),
    "wallet.transactions": arrayUnion({
      type: "deposit",
      amount,
      date: new Date().toISOString(),
    }),
  });
}

// Withdraw
export async function withdrawFromWallet(userId, amount) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    "wallet.balance": increment(-amount),
    "wallet.transactions": arrayUnion({
      type: "withdraw",
      amount,
      date: new Date().toISOString(),
    }),
  });
}
