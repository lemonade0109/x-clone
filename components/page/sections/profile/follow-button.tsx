import { toggleFollowAction } from "@/lib/actions/user/follower-action";
import React from "react";
import { toast } from "sonner";

const FollowButton: React.FC<{
  targetUserId: string;
  isFollowing: boolean;
}> = ({ targetUserId, isFollowing }) => {
  const [following, setFollowing] = React.useState(isFollowing);
  const [isPending, startTransition] = React.useTransition();
  const [hovered, setHovered] = React.useState(false);

  const handleFollow = () => {
    startTransition(async () => {
      const prev = following;
      setFollowing(!prev);

      const res = await toggleFollowAction(targetUserId);
      if (!res.success) {
        setFollowing(prev);
        toast.error(res.error ?? "Failed");
      } else {
        toast.success(res.followed ? "Following!" : "Unfollowed.");
      }
    });
  };
  return (
    <button
      type="button"
      onClick={handleFollow}
      disabled={isPending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`min-w-[100px] rounded-full border px-4 py-2 text-sm font-bold transition ${following ? (hovered ? "border-red-300 bg-red-500/10" : "border-zinc-300 bg-transparent text-black dark:text-white") : "border-none bg-black text-white dark:bg-white dark:text-black"}`}
    >
      {following ? (hovered ? "Unfollow" : "Following") : "Follow"}
    </button>
  );
};

export default FollowButton;
