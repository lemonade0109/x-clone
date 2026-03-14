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
  const hasValue = !!value;

  return (
    <div className="relative">
      <Select value={value} onValueChange={onValueChange} onOpenChange={setOpen}>
        <SelectTrigger
          className={cn(
            "h-16 min-h-16 w-full rounded-md border bg-transparent px-4 pt-6 pb-2",
            "text-left text-[17px] leading-6 text-black shadow-none outline-none",
            "border-zinc-300",
            "focus:ring-2 focus:ring-[#1d9bf0]/20 focus:border-[#1d9bf0]",
            "focus-visible:ring-2 focus-visible:ring-[#1d9bf0]/20 focus-visible:border-[#1d9bf0]",
            "data-[state=open]:border-[#1d9bf0]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            triggerClassName,
          )}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className={contentClassName}>{children}</SelectContent>
      </Select>

      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          hasValue || open
            ? "top-2.5 text-[13px] text-zinc-500"
            : "top-1/2 -translate-y-1/2 text-[17px] text-zinc-500",
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
