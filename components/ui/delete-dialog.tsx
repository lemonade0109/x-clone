"use client";
import React, { startTransition } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { toast } from "sonner";
import { deletePostAction } from "@/lib/actions/post-actions/delete-post";

const DeleteDialog = ({
  postId,
  authorId,
  currentUserId,
}: {
  postId: string;
  authorId: string;
  currentUserId: string;
}) => {
  const [isPending, startTransition] = React.useTransition();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDelete = () => {
    if (currentUserId !== authorId) {
      toast.error("You can only delete your own posts!");
      return;
    }

    startTransition(async () => {
      const res = await deletePostAction(postId);

      if (!res.success) {
        toast.error(
          res.error || "Failed to delete the post. Please try again.",
        );
        return;
      }

      toast.success("Post deleted successfully!");
      setIsDialogOpen(false);
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div className="flex text-2xl font-bold items-center space-x-3">
          <MdDeleteOutline className="w-7 h-7 text-red-500" />
          <p className="text-red-500">Delete</p>
        </div>
      </DialogTrigger>

      <DialogContent className=" border border-black rounded-2xl max-w-sm">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-bold">Delete post?</DialogTitle>
          <DialogDescription className="text-gray-500 max-w-57.5 text-lg">
            This can&apos;t be undone and it will be removed from your profile,
            the timeline of any accounts that follow you, and from search
            results.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="my-2">
          <div className="flex flex-col space-y-4 w-full ">
            <Button
              disabled={isPending}
              onClick={handleDelete}
              variant="destructive"
              className=" rounded-full py-8 font-bold text-white"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>

            <Button
              variant="outline"
              className="rounded-full py-8 font-bold"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
