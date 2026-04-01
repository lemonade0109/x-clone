"use client";
import React from "react";
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

const DeleteDialog = ({
  tweetId,
  authorId,
}: {
  tweetId: string;
  authorId: string;
}) => {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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
              disabled={isDeletePending}
              onClick={() => {
                if (userId === authorId) {
                  startDeleteTransition(() => {
                    deleteTweet({ tweetId: tweetId });
                    toast({
                      description: "Tweet deleted successfully!",
                    });
                  });
                } else {
                  toast({
                    description: "You can only delete your own tweets!",
                  });
                }
              }}
              variant="destructive"
              className=" rounded-full py-8 font-bold text-white"
            >
              Delete
            </Button>

            <Button
              variant="outline"
              className="rounded-full py-8 font-bold"
              onClick={() => setIsDialogOpen(false)}
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
