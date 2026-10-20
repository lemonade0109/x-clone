"use client";

import React, { useTransition, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { clearAllBookmarksAction } from "@/lib/actions/bookmark/bookmark.action";
import { useRouter } from "next/navigation";

export default function ClearBookmarksButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClearBookmarks = () => {
    startTransition(async () => {
      const res = await clearAllBookmarksAction();
      if (!res.success) {
        toast.error(res.error || "Failed to clear bookmarks");
        return;
      }
      toast.success("Bookmarks cleared");
      setIsDialogOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            aria-label="More bookmark options"
          >
            <MdMoreHoriz className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            Clear all Bookmarks
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold">
              Clear all Bookmarks?
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500">
              This can’t be undone and you’ll remove all posts you’ve added to
              your Bookmarks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-col">
            <Button
              variant="destructive"
              className="w-full rounded-full py-5 font-bold"
              onClick={handleClearBookmarks}
              disabled={isPending}
            >
              {isPending ? "Clearing..." : "Clear"}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full py-5 font-bold"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

