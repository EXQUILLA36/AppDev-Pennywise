import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserFromFirestore(clerkId) {
  try {
    const userRef = doc(db, "users", clerkId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn("⚠️ No user found with ID:", clerkId);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user from Firestore:", error);
    return null;
  }
}
