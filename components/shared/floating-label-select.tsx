"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FloatingLabelSelectProps = {
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  children: React.ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
};

const FloatingLabelSelect = ({
  label,
  value,
  onValueChange,
  error,
  children,
  contentClassName,
  triggerClassName,
}: FloatingLabelSelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Select
        value={value}
        onValueChange={onValueChange}
        onOpenChange={setOpen}
      >
        <SelectTrigger
          className={cn(
            // X-like field box
            "h-16 min-h-16 w-full rounded-md border bg-transparent px-3.5 pt-6 pb-2",
            // push selected value to lower row
            "inline-flex items-end justify-between",
            // text
            "text-left text-[17px] leading-5 text-black shadow-none outline-none",
            // border/focus
            "border-zinc-300",
            "focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20",
            "focus-visible:border-[#1d9bf0] focus-visible:ring-2 focus-visible:ring-[#1d9bf0]/20",
            "data-[state=open]:border-[#1d9bf0]",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            triggerClassName,
          )}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className={contentClassName}>{children}</SelectContent>
      </Select>

      {/* Always top-left, like real X DOB selects */}
      <span
        className={cn(
          "pointer-events-none absolute left-3.5 top-2 text-[12px] leading-4 text-zinc-500 transition-colors",
          open && !error && "text-[#1d9bf0]",
          error && "text-red-500",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default FloatingLabelSelect;
