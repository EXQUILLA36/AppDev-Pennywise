import React, { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// export default function BudgetEditor() {
//   const [transactionType, setTransactionType] = useState("");
//   const [source, setSource] = useState();

export default function BudgetEditor({ ClerkId, IncomeSource, ExpenseSource }) {
  const [transactionType, setTransactionType] = useState("");
  const [newSource, setNewSource] = useState();
  const [deleteSource, setDeleteSource] = useState("");

  const handleNewSourceSubmit = () => {
    if (!transactionType || !newSource) {
      toast.warning("Please fill all the fields!");
      return;
    }

    console.log("Submitting new source:");

    addNewSource(ClerkId, newSource, transactionType);
  };

  async function addNewSource(userId, newSource, transactionType) {
    try {
      const userRef = doc(db, "users", userId);
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

  return (
    <div>
      <Sheet>
        <SheetTrigger className="bg-red-500 h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-red-600 duration-300 cursor-pointer">
          Budget & Sources
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-[#191919] border-l border-white/30 p-2"
        >
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
                      "px-[1.5vw] bg-orange-500 hover:bg-amber-400 cursor-pointer"
                    }
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setTransactionType("");
                      setNewSource("");
                    }}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </section>
            </TabsContent>

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
                    className="px-[1.5vw] bg-orange-500 hover:bg-amber-400 cursor-pointer"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setTransactionType("");
                      setDeleteSource("");
                    }}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </section>
            </TabsContent>
          </Tabs>

          <SheetHeader>
            <SheetTitle>Budget Your Funds</SheetTitle>
            <SheetDescription>Add new Budget field here.</SheetDescription>
          </SheetHeader>

          <section className="w-full border border-white/30 h-fit p-2 rounded-lg">
            <Select value={deleteSource} onValueChange={setDeleteSource}>
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
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
}
