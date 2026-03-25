"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { TooltipContainerProps } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tooltipVariants = cva("rounded-sm tracking-normal text-sm px-1 py-0", {
  variants: {
    variant: {
      blueShade: " bg-twitter/20 text-white/70 ",
      blackShade: " bg-white/50 text-white/70 ",
    },
  },
});

interface ContainerProps
  extends TooltipContainerProps, VariantProps<typeof tooltipVariants> {}

const TooltipContainer = ({
  disabled,
  className,
  variant,
  content,
  children,
}: ContainerProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger disabled={disabled}>{children}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          className={cn(tooltipVariants({ variant, className }))}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TooltipContainer, tooltipVariants };
