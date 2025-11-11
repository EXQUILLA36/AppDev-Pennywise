import React, { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBudgets } from "@/hooks/budgetsHooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import IconSelect from "../ui/iconSelect";

// export default function BudgetEditor() {
//   const [transactionType, setTransactionType] = useState("");
//   const [source, setSource] = useState();

export default function BudgetEditor({ ClerkId, IncomeSource, ExpenseSource }) {
  const [transactionType, setTransactionType] = useState("");
  const [newSource, setNewSource] = useState();
  const [deleteSource, setDeleteSource] = useState("");
  const [budgetSource, setBudgetSource] = useState("");
  const [budgetDelete, setBudgetDelete] = useState("");
  const [scheduleReset, setScheduleReset] = useState("");
  const [amountAllocation, setAmountAllocation] = useState("");

  const [icon, setIcon] = useState("Building");
  const { budgets, totalAllocated, totalUsed, loading } = useBudgets(ClerkId);

  console.log("EXISTING BUDGETS:", budgets);

  async function handleNewSourceSubmit() {
    if (!transactionType || !newSource) {
      toast.warning("Please fill all the fields!");
      return;
    }

    console.log("Submitting new source:");

    try {
      const userRef = doc(db, "users", ClerkId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error("User not found!");

      const formattedSource = newSource.trim().toLowerCase();

      if (transactionType === "Income") {
        const incomeSources = userSnap.data().incomeSource || [];

        const duplicate = incomeSources.some(
          (src) => src.trim().toLowerCase() === formattedSource
        );

        if (duplicate) {
          toast.warning(`"${newSource}" already exists in Income Sources!`);
          return;
        }

        const updateIncomeSources = [...incomeSources, newSource];

        await updateDoc(userRef, { incomeSource: updateIncomeSources });
        toast.success("Source Updated!");
        setNewSource("");
        setTransactionType("");
      } else if (transactionType === "Expense") {
        const expenseSources = userSnap.data().expenseSource || [];

        const duplicate = expenseSources.some(
          (src) => src.trim().toLowerCase() === formattedSource
        );

        if (duplicate) {
          toast.warning(`"${newSource}" already exists in Income Sources!`);
          return;
        }

        const updateExpenseSources = [...expenseSources, newSource];

        await updateDoc(userRef, { expenseSource: updateExpenseSources });
        toast.success("Source Updated!");
        setNewSource("");
        setTransactionType("");
      }
    } catch (error) {
      console.error("Error updating sources:", error);
    }
  }

  async function handleDeleteSource() {
    if (!transactionType || !deleteSource) {
      toast.warning("Please select type and source to delete!");
      return;
    }

    try {
      const userRef = doc(db, "users", ClerkId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error("User not found!");

      if (transactionType === "Income") {
        const updatedIncome = (userSnap.data().incomeSource || []).filter(
          (s) => s !== deleteSource
        );
        await updateDoc(userRef, { incomeSource: updatedIncome });
      } else {
        const updatedExpense = (userSnap.data().expenseSource || []).filter(
          (s) => s !== deleteSource
        );
        await updateDoc(userRef, { expenseSource: updatedExpense });
      }

      toast.success("Source deleted!");
      setDeleteSource("");
      setTransactionType(""); // reset selects
    } catch (err) {
      console.error(err);
      toast.error("Error deleting source");
    }
  }

  async function handleNewBudget() {
    if (!budgetSource || !amountAllocation) {
      toast.warning("Please fill all the fields!");
      return;
    }

    const newBudget = {
      budgetSource: budgetSource,
      icons: icon,
      resets: scheduleReset,
      amountAllocated: amountAllocation,
      amountUsed: 0,
    };

    console.log("CREATING BUDGET OBJECT:", newBudget);

    try {
      const userRef = doc(db, "users", ClerkId);
      const userSnap = await getDoc(userRef);

      const budgets = userSnap.data().budgets || [];

      await updateDoc(userRef, {
        budgets: [...budgets, newBudget],
      });
      toast.success("Watching over new budget");

      setAmountAllocation("");
      setBudgetSource("");
      setAmountAllocation("");
      setScheduleReset("");
      setIcon("");
    } catch (e) {
      toast.error("Error recording transaction!");
    }
  }

  async function handleDeleteBudget() {
    if (!budgetDelete) {
      toast.warning("Please select a budget to delete!");
      return;
    }

    try {
      const userRef = doc(db, "users", ClerkId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User not found!");
        return;
      }

      const userData = userSnap.data();
      const budgets = userData.budgets || [];

      const updatedBudgets = budgets.filter(
        (budget) => budget.budgetSource !== budgetDelete
      );

      await updateDoc(userRef, { budgets: updatedBudgets });

      toast.success(`Budget "${budgetDelete}" has been deleted!`);
      setBudgetDelete("");
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Error deleting budget!");
    }
  }

  return (
    <div>
      <Sheet>
        {/* WINDOW BUTTON */}
        <SheetTrigger className="bg-red-500 text-white h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-red-600 duration-300 cursor-pointer">
          Budget & Sources
        </SheetTrigger>
        {/* CONTENT */}
        <SheetContent
          side="right"
          className="bg-[#191919] border-l text-white border-white/30 p-2"
        >
          {/* NEW INCOME / EXPENSE SOURCE  */}
          <SheetHeader>
            <SheetTitle>Add New Source</SheetTitle>
            <SheetDescription>
              Add new Income or Expense Sources here.
            </SheetDescription>
          </SheetHeader>

          <Tabs
            defaultValue="add"
            className="w-full border border-white/30 pt-1 rounded-lg"
          >
            <TabsList className="w-full px-2">
              <TabsTrigger value="add">Add Source</TabsTrigger>
              <TabsTrigger value="delete">Delete Source</TabsTrigger>
            </TabsList>

            {/* SOURCE ADD SECTION */}
            <TabsContent value="add">
              <section className="flex flex-col">
                <div className="p-2 flex gap-2">
                  <Select
                    value={transactionType}
                    onValueChange={setTransactionType}
                  >
                    <SelectTrigger className="w-[40%]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    type="source"
                    placeholder="New Source..."
                  />
                </div>
                <div className="p-2 flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      handleNewSourceSubmit();
                    }}
                    className={
                      "w-full px-[1.5vw] bg-orange-500 hover:bg-amber-400 cursor-pointer"
                    }
                  >
                    Add
                  </Button>
                </div>
              </section>
            </TabsContent>

            {/* SOURCE DELETE SECTION */}
            <TabsContent value="delete">
              <section className="flex flex-col">
                <div className="p-2 flex gap-2">
                  <Select
                    value={transactionType}
                    onValueChange={setTransactionType}
                  >
                    <SelectTrigger className="w-[40%]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={deleteSource} onValueChange={setDeleteSource}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {(transactionType === "Income"
                        ? IncomeSource
                        : ExpenseSource
                      )?.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-2 flex justify-end gap-2">
                  <Button
                    onClick={() => handleDeleteSource()}
                    className="w-full px-[1.5vw] bg-red-500 hover:bg-amber-400 cursor-pointer"
                  >
                    Delete
                  </Button>
                </div>
              </section>
            </TabsContent>
          </Tabs>

          <section className="w-full border-b-2 border-white/30"></section>

          {/* ALLOCATE BUDGET SECTION */}
          <SheetHeader>
            <SheetTitle>Budget Your Funds</SheetTitle>
            <SheetDescription>Add new Budget field here.</SheetDescription>
          </SheetHeader>

          <Tabs
            defaultValue="newBudget"
            className="w-full border border-white/30 pt-1 rounded-lg"
          >
            <TabsList className="w-full px-2">
              <TabsTrigger value="newBudget">Add Budget</TabsTrigger>
              <TabsTrigger value="deleteBudget">Delete Budget</TabsTrigger>
            </TabsList>

            {/* ADD NEW BUDGET */}
            <TabsContent value="newBudget">
              <section className="flex flex-col p-2 gap-2">
                <div className="flex gap-2">
                  <Select value={budgetSource} onValueChange={setBudgetSource}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {ExpenseSource.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <IconSelect value={icon} onChange={setIcon} />
                  <Select
                    value={scheduleReset}
                    onValueChange={setScheduleReset}
                  >
                    <SelectTrigger className="w-[50%]">
                      <SelectValue placeholder="Reset Schedule" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={amountAllocation}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow digits
                      if (/^\d*\.?\d*$/.test(value)) {
                        setAmountAllocation(value);
                      }
                    }}
                    type="source"
                    placeholder="Allocate budget"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => handleNewBudget()}
                    className="w-full px-[1.5vw] bg-orange-500 hover:bg-amber-400 cursor-pointer"
                  >
                    Create Budget
                  </Button>
                </div>
              </section>
            </TabsContent>

            {/* DELETE A BUDGET */}
            <TabsContent value="deleteBudget">
              <section className="flex flex-col">
                <div className="p-2 flex gap-2">
                  <Select value={budgetDelete} onValueChange={setBudgetDelete}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Delete Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {budgets.map((budget, index) => (
                        <SelectItem key={index} value={budget.budgetSource}>
                          {budget.budgetSource}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full  p-2 flex justify-end gap-2">
                  <Button
                    onClick={() => handleDeleteBudget()}
                    className="px-[1.5vw] w-full bg-red-500 hover:bg-amber-400 cursor-pointer"
                  >
                    Delete
                  </Button>
                </div>
              </section>
            </TabsContent>
          </Tabs>
          <section className="w-full border-b-2 border-white/30"></section>
        </SheetContent>
      </Sheet>
    </div>
  );
}
