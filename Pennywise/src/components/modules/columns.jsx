"use client"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"

export const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Transactin Type",
  },
  {
    accessorKey: "source",
    header: "Transaction Source",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const amount = row.getValue("amount");

      const color = 
        type === "Expense"
        ? "text-red-500"
        : "text-orange-500";

      return(
        <span className={`montserrat-bold   ${color}`}>
          {type === "Expense" 
            ? `-₱${amount.toLocaleString()}`
            : `+₱${amount.toLocaleString()}`
          }
        </span>
      )
    }
  },
]