import React, { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Wallet } from "lucide-react";

export default function BalanceEditor({
  ClerkId,
  IncomeSource,
  ExpenseSource,
}) {
  const [transactionType, setTransactionType] = useState("");
  const [transactionSource, setTransactionSource] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());

  const handleSubmit = () => {
    if (!transactionType || !transactionSource || !amount) {
      toast.warning("Error recording transaction!");
      return;
    }

    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-PH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newTransaction = {
      type: transactionType,
      source: transactionSource,
      amount: parseFloat(amount),
      date: formattedDateTime, //
    };

    console.log("Submitting transaction:", newTransaction);

    // TODO: Save to Firestore or your state
    // Example: append to userData.transactions array
    addTransactionToFirestore(ClerkId, newTransaction);

    setTransactionType("");
    setTransactionSource("");
    setAmount("");
  };

  async function addTransactionToFirestore(userId, newTransaction) {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error("User not found");

      const wallet = userSnap.data().wallet || {
        total_balance: 0,
        total_income: 0,
        total_expenses: 0,
        total_savings: 0,
      };
      const amount = Number(newTransaction.amount);
      const type = newTransaction.type;
      let updatedWallet = { ...wallet };
      if (type === "Income") {
        updatedWallet.total_balance += amount;
        updatedWallet.total_income += amount;
      } else if (type === "Expense") {
        updatedWallet.total_balance -= amount;
        updatedWallet.total_expenses += amount;
      }

      await updateDoc(userRef, {
        wallet: updatedWallet,
        transactions: arrayUnion(newTransaction), // adds to the array
      });

      console.log("✅ Transaction added successfully:", newTransaction);
      toast.success("Succesfully recorded transaction!");
    } catch (err) {
      console.error("❌ Error adding transaction:", err);
      toast.error("Error recording transaction!");
    }
  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="bg-orange-500 h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-orange-400 duration-300 cursor-pointer">
          Manage Balance
        </DrawerTrigger>
        <DrawerContent
          className={
            "bg-[#191919] border border-white/10 rounded-2xl shadow-lg shadow-black/30 flex flex-col gap-5 items-center justify-center p-[1vw]"
          }
        >
          <DrawerHeader>
            <DrawerTitle className={"typo-sub"}>Manage you balance</DrawerTitle>
            <DrawerDescription className={"typo-par"}>
              Add or edit your wallet balance and transactions.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center w-[50%] gap-2">
            <input
              type="text"
              placeholder="Php"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center p-[1vw] typo-subheader poppins-medium border-b border-white/10 rounded-md focus:border-b focus:outline-none focus:ring-0"
            />
          </div>
          <div className="w-[30%] flex flex-row gap-2 items-center justify-center">
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-[40%]">
                <SelectValue placeholder="Transaction" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={setTransactionSource}
              disabled={!transactionType}
            >
              <SelectTrigger className="w-[40%]">
                <SelectValue placeholder="Sources" />
              </SelectTrigger>
              <SelectContent position="popper">
                {transactionType === "Income"
                  ? IncomeSource.map((source, index) => (
                      <SelectItem value={source}>{source}</SelectItem>
                    ))
                  : ExpenseSource.map((source, index) => (
                      <SelectItem value={source}>{source}</SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
          <DrawerFooter className={"w-[25%]"}>
            <DrawerClose
              className={"w-full flex flex-row gap-2 justify-center p-0"}
            >
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                className={
                  "w-[50%] bg-orange-500 hover:bg-orange-700 cursor-pointer"
                }
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  setTransactionType(null);
                  console.log(transactionType);
                }}
                variant="outline"
                className={"w-[50%] cursor-pointer"}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
