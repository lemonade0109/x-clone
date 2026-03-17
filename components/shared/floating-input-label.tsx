"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FloatingInputLabelProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: boolean;
  labelClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixClassName?: string;
  suffixClassName?: string;
};

const FloatingInputLabel = React.forwardRef<
  HTMLInputElement,
  FloatingInputLabelProps
>(
  (
    {
      className,
      label,
      error,
      id,
      labelClassName,
      prefix,
      suffix,
      prefixClassName,
      suffixClassName,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          placeholder=" "
          className={cn(
            "peer h-16 w-full rounded-md border bg-transparent px-4 pt-6 pb-2",
            "text-[15px] leading-6 text-black outline-none transition-all",
            "border-zinc-300",
            "focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />

        {prefix ? (
          <span
            className={cn(
              "pointer-events-none absolute left-4 z-10 text-[20px] leading-none transition-all duration-200",
              "top-1/2 -translate-y-1/2 text-zinc-500",
              "peer-focus:top-9.5 peer-focus:-translate-y-1/2 peer-focus:text-[#1d9bf0]",
              "peer-[:not(:placeholder-shown)]:top-9.5 peer-[:not(:placeholder-shown)]:-translate-y-1/2",
              error && "text-red-500 peer-focus:text-red-500",
              prefixClassName,
            )}
          >
            {prefix}
          </span>
        ) : null}

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-zinc-500 transition-all duration-200",

            "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-[#1d9bf0]",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]",
            error && "text-red-500 peer-focus:text-red-500",
            labelClassName,
          )}
        >
          {label}
        </label>

        {suffix ? (
          <span
            className={cn(
              "pointer-events-none absolute right-4 top-9.5 z-10 -translate-y-1/2",
              suffixClassName,
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
    );
  },
);

FloatingInputLabel.displayName = "FloatingInputLabel";

export default FloatingInputLabel;
