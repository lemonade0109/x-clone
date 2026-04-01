"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { links } from "@/lib/utils";
import DeleteDialog from "./delete-dialog";
import TooltipContainer from "./tooltip-container";

const MoreDetails = ({
  postId,
  authorId,
  currentUserId,
}: {
  postId: string;
  authorId: string;
  currentUserId: string;
}) => {
  return (
    <Popover>
      <TooltipContainer content="More" side="bottom">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="group w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#1d9bf0]/15"
            aria-label="More details"
          >
            <HiDotsHorizontal className="h-6 w-6 text-zinc-500 group-hover:text-[#1d9bf0]" />
          </button>
        </PopoverTrigger>
      </TooltipContainer>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="z-50 w-80 rounded-2xl shadow-xl"
      >
        <ul className="space-y-4">
          {currentUserId === authorId && (
            <li>
              <DeleteDialog
                authorId={authorId}
                postId={postId}
                currentUserId={currentUserId}
              />
            </li>
          )}

          {links.map((link) => (
            <li key={link.label}>
              <div className="flex items-center space-x-3 text-xl font-semibold">
                <link.icon className="h-6 w-6" />
                <p>{link.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MoreDetails;
