import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

export type TooltipContainerProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
  contentClassName?: string;
  variant?: "blueShade" | "default";
};

const TooltipContainer: React.FC<TooltipContainerProps> = ({
  content,
  children,
  disabled = false,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  delayDuration = 180,
  contentClassName,
  variant = "default",
}) => {
  if (disabled || !content) return <>{children}</>;
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{children}</span>
        </TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "rounded-sm bg-[#0f1419] px-2 py-1 text-[11px] leading-4 text-white shadow-[0_4px_14px_rgba(0,0,0,0.28)]",
            variant === "blueShade" && "bg-sky-500/20",
            contentClassName,
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainer;
