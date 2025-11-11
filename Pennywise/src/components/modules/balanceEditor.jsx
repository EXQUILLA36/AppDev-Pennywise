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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Wallet } from "lucide-react";

export default function BalanceEditor({
  ClerkId,
  IncomeSource,
  ExpenseSource,
}) {
  const [transactionType, setTransactionType] = useState("");
  const [transactionSource, setTransactionSource] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [pendingBudgetIndex, setPendingBudgetIndex] = useState(null);

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

      const userData = userSnap.data();

      const wallet = userData.wallet || {
        total_balance: 0,
        total_income: 0,
        total_expenses: 0,
        total_savings: 0,
      };

      const budgets = userData.budgets || [];

      const amount = Number(newTransaction.amount);
      const type = newTransaction.type;
      const source = newTransaction.source;
      let updatedWallet = { ...wallet };

      // *Checks what kind of transaction type
      if (type === "Income") {
        updatedWallet.total_balance += amount;
        updatedWallet.total_income += amount;
        // *If i's Expense, checks if a budget goal exist for it
      } else if (type === "Expense") {
        const budgetIndex = budgets.findIndex(
          (b) => b.budgetSource === transactionSource
        );

        if (amount > wallet.total_balance) {
          console.log("You’re trying to spend more than your total balance!");
          toast.warning(
            `Not enough wallet balance! You only have ₱${wallet.total_balance.toLocaleString()} left.`
          );
          setPendingTransaction(newTransaction);
          setPendingBudgetIndex(budgetIndex !== -1 ? budgetIndex : null);
          setIsOpen(true);
          return;
        }

        // *Gathers all the numerical data and process users transaction and checks if the remaining budget can handle the transaction
        if (budgetIndex !== -1) {
          const allocated = budgets[budgetIndex].amountAllocated;
          const used = budgets[budgetIndex].amountUsed;
          const remaining = allocated - used;

          console.log("Amount:", amount);
          console.log("Remaining:", remaining);

          // *Warns the user if the amount to spend is greater than the remaining budget balance
          if (amount > remaining) {
            console.log("You are spending way more than your allotted budget");
            toast.warning(
              `Not enough budget for ${source}. Remaining: ₱${remaining.toLocaleString()}`
            );
            setPendingTransaction(newTransaction);
            setPendingBudgetIndex(budgetIndex);
            // *Opens an alert box for user giving them warning that they are over spending
            setIsOpen(true);
            return;
          }

          // *Updates the database if budget goal for the source doesn't exist
          budgets[budgetIndex] = {
            ...budgets[budgetIndex],
            amountUsed: used + amount,
          };
        }
        updatedWallet.total_balance -= amount;
        updatedWallet.total_expenses += amount;
      }
      // *Updates the firebase
      await updateDoc(userRef, {
        wallet: updatedWallet,
        budgets: budgets,
        transactions: arrayUnion(newTransaction),
      });
    } catch (err) {
      console.error(err);
    }
  }

  const handleConfirmOverspend = async () => {
    if (!pendingTransaction || pendingBudgetIndex === null) return;

    try {
      const userRef = doc(db, "users", ClerkId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error("User not found");

      const userData = userSnap.data();
      const budgets = userData.budgets || [];
      const wallet = { ...userData.wallet };

      const amount = Number(pendingTransaction.amount);

      // Update the budget
      budgets[pendingBudgetIndex] = {
        ...budgets[pendingBudgetIndex],
        amountUsed: (budgets[pendingBudgetIndex].amountUsed || 0) + amount,
      };

      // Update wallet
      wallet.total_balance -= amount;
      wallet.total_expenses += amount;

      // Push transaction
      await updateDoc(userRef, {
        wallet: wallet,
        budgets: budgets,
        transactions: arrayUnion(pendingTransaction),
      });

      toast.success("Transaction added (Your wallet's in shambles 😨)");
    } catch (err) {
      console.error(err);
      toast.error("Error adding transaction!");
    } finally {
      setIsOpen(false);
      setPendingTransaction(null);
      setPendingBudgetIndex(null);
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="bg-orange-500 h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 text-white hover:bg-orange-400 duration-300 cursor-pointer">
          Manage Balance
        </DrawerTrigger>
        <DrawerContent
          className={
            "bg-[#191919] border text-white border-white/10 rounded-2xl shadow-lg shadow-black/30 flex flex-col gap-5 items-center justify-center p-[1vw]"
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
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits
                if (/^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
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
          <DrawerFooter className={"w-[25%] text-white"}>
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
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Whoa! Slow Down!</AlertDialogTitle>
              <AlertDialogDescription>
                Take a look at your expenses and prioritize what truly matters.
                Small adjustments can keep you within budget.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  setPendingTransaction(null);
                  setPendingBudgetIndex(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                onClick={handleConfirmOverspend}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Drawer>
    </div>
  );
}
