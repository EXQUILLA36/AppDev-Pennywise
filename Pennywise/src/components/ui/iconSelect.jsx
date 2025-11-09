"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // ← use your shadcn select path

const iconList = [
  "Building",
  "Clapperboard",
  "ReceiptEuro",
  "ShieldCheck",
  "NotebookPen",
  "ChartNoAxesCombined",
  "Hammer",
  "Home",
  "Car",
  "Hamburger",
  "Coffee",
  "BottleWine",
  "Landmark",
  "PhilippinePeso",
  "HandCoins",
  "Gift",
  "ClipboardList",
  "Plane",
  "Ambulance",
  "Cat",
  "ShoppingCart",
  "GraduationCap",
  "ShoppingBasket",
  "Cigarette",
  "Users"
];

export default function IconSelect({ value, onChange }) {
  const SelectedIcon = LucideIcons[value] || LucideIcons.HelpCircle;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select an icon">
          <div className="flex items-center gap-2">
            <SelectedIcon size={18} color="#ffffff" />
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="w-60 p-2">
        <div className="grid grid-cols-5 gap-2">
          {iconList.map((iconName) => {
            const Icon = LucideIcons[iconName];
            return (
              <SelectItem
                key={iconName}
                value={iconName}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-accent focus:bg-white/50 cursor-pointer"
              >
                <Icon color="#ffffff" size={20} />
              </SelectItem>
            );
          })}
        </div>
      </SelectContent>
    </Select>
  );
}
