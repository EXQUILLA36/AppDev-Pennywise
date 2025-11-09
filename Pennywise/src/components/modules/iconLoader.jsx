"use client";

import * as LucideIcons from "lucide-react";

export default function Icon({ name, size = 24, color = "black" }) {
  // Convert kebab-case to PascalCase if needed
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  const IconComponent = LucideIcons[pascalName];

  if (!IconComponent) return <span>❌</span>;

  return <IconComponent size={size} color={color} />;
}
