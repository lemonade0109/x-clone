"use client";

import DeleteDialog from "@/components/ui/delete-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TooltipContainer from "@/components/ui/tooltip-container";
import { toggleFollowAction } from "@/lib/actions/user/follower-action";
import { getPopoverProfileAction } from "@/lib/actions/user/get-popover-profile-action";
import React from "react";
import { FiLink, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "sonner";

interface PostDetailMoreDetailsProps {
  postId: string;
  authorId: string;
  authorUsername: string;
  currentUserId: string;
}

const PostDetailMoreDetails: React.FC<PostDetailMoreDetailsProps> = ({
  postId,
  authorId,
  authorUsername,
  currentUserId,
}) => {
  const isOwner = currentUserId === authorId;
  const [following, setFollowing] = React.useState<boolean>(false);
  const [followLoaded, setFollowLoaded] = React.useState<boolean>(false);
  const [isPending, startTransition] = React.useTransition();
  const hasFetchedRef = React.useRef<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    if (open && !isOwner && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      startTransition(async () => {
        const data = await getPopoverProfileAction(authorId);
        if (data) {
          setFollowing(data.isFollowing);
          setFollowLoaded(true);
        }
      });
    }
  };

  const handleToggleFollow = () => {
    const prev = following;
    setFollowing(!prev);
    startTransition(async () => {
      const res = await toggleFollowAction(authorId);
      if (!res.success) {
        setFollowing(prev);
        toast.error(res.error ?? "Failed to update follow status. Please try again.");
      } else {
        toast.success(
        res.followed ? `You are now following @${authorUsername}` : `You have unfollowed @${authorUsername}`,
        );
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${authorUsername}/status/${postId}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <TooltipContainer content="More" side="bottom">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="group w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            aria-label="More details"
          >
            <HiDotsHorizontal className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition" />
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
          {isOwner ? (
            <li>
              <DeleteDialog
                authorId={authorId}
                postId={postId}
                currentUserId={currentUserId}
              />
            </li>
          ) : (
            <li>
              <button
                type="button"
                onClick={handleToggleFollow}
                disabled={isPending || !followLoaded}
                className="flex items-center space-x-3 text-md font-semibold disabled:opacity-50 cursor-pointer "
              >
                {following ? (
                  <FiUserMinus className="w-6 h-6" />
                ) : (
                  <FiUserPlus className="w-6 h-6" />
                )}
                <span>
                  {following ? "Unfollow" : "Follow"} @{authorUsername}
                </span>
              </button>
            </li>
          )}

          <li>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center space-x-3 text-md font-semibold"
            >
              <FiLink className="w-6 h-6" />
              <span>Copy link to post</span>
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default PostDetailMoreDetails;
