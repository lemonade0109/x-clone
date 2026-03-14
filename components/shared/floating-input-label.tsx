"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type FloatingInputLabelProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: boolean;
};

const FloatingInputLabel = React.forwardRef<
  HTMLInputElement,
  FloatingInputLabelProps
>(({ className, label, error, id, ...props }, ref) => {
  const inputId = id ?? React.useId();

  return (
    <div className="relative">
      <input
        ref={ref}
        id={inputId}
        placeholder=" "
        className={cn(
          "peer w-full rounded-md border bg-transparent px-4 pb-3 pt-6 text-[17px] leading-5 text-black outline-none transition-all",
          "border-zinc-300",
          "focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        {...props}
      />

      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-all duration-200",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[17px]",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px]  peer-focus:text-[#1d9bf0]",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]",
          error && "text-red-500 peer-focus:text-red-500",
        )}
      >
        {label}
      </label>
    </div>
  );
});

FloatingInputLabel.displayName = "FloatingInputLabel";

export default FloatingInputLabel;
