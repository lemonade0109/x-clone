"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PopoverProfileData } from "@/types";
import { getPopoverProfileAction } from "@/lib/actions/user/get-popover-profile-action";
import { toggleFollowAction } from "@/lib/actions/user/follower-action";
import { toast } from "sonner";

//TODO: Making the profilePopover component dynamic!.
const ProfilePopover: React.FC<{
  userId: string;
  name: string | undefined;
  userName: string | undefined;
  profileImage: string | undefined;
  bio: string | undefined;
  children: React.ReactNode;
}> = ({ userId, name, userName, profileImage, bio, children }) => {
  const [profileData, setProfileData] =
    React.useState<PopoverProfileData | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [following, setFollowing] = React.useState<boolean>(false);
  const [followPending, startFollowTransition] = React.useTransition();
  const [followHovered, setFollowHovered] = React.useState<boolean>(false);
  const hasFecthedRef = React.useRef(false);

  const handleOpenChange = (open: boolean) => {
    if (open && !hasFecthedRef.current) {
      hasFecthedRef.current = true;
      startTransition(async () => {
        const data = await getPopoverProfileAction(userId);
        setProfileData(data);
      });
    }
  };

  React.useEffect(() => {
    if (profileData) {
      setFollowing(profileData.isFollowing);
    }
  }, [profileData]);

  const handleToggleFollow = () => {
    const prev = following;
    setFollowing(!prev);
    startFollowTransition(async () => {
      const res = await toggleFollowAction(userId);
      if (!res.success) {
        setFollowing(prev);
        toast.error(
          res.error ?? "Failed to update follow status. Please try again.",
        );
      }
    });
  };

  return (
    <HoverCard openDelay={500} closeDelay={200} onOpenChange={handleOpenChange}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent className="h-[280px] w-[240px] overflow-hidden rounded-2xl bg-black p-0 shadow-lg shadow-white/30">
        <div className="flex h-full w-full flex-col gap-1.5 p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Link href={`/${userName}`}>
                <Image
                  src={profileImage || ""}
                  alt="profile image"
                  fill
                  className="rounded-full"
                />
              </Link>
            </div>

            <div>
              {profileData && !profileData.isOwner && (
                <Button
                  onClick={handleToggleFollow}
                  disabled={followPending}
                  onMouseEnter={() => setFollowHovered(true)}
                  onMouseLeave={() => setFollowHovered(false)}
                  className={`h-8 rounded-full px-3 text-xs font-bold ${following ? (followHovered ? "border border-red-400 bg-transparent text-black hover:bg-white/90" : "border border-gray-400 text-black hover:bg-white/90") : "border-none bg-white text-black hover:bg-white/90"}`}
                >
                  {following
                    ? followHovered
                      ? "Unfollow"
                      : "Following"
                    : "Follow"}
                </Button>
              )}
            </div>
          </div>

          <div className="text-start leading-tight">
            <p className="text-sm font-bold">{name}</p>
            <p className="text-xs text-gray-500">@{userName}</p>
          </div>

          <div className="max-h-20 overflow-hidden text-xs leading-snug text-gray-200">
            <p>
              {bio ||
                "This user has not provided a bio yet. Please check back later for more information."}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <p className="text-gray-500">
              <span className="pr-1 font-bold text-white">
                {profileData?.followingCount ?? 0}
              </span>
              Following
            </p>
            <p className="text-gray-500">
              <span className="pr-1 font-bold text-white">
                {profileData?.followersCount ?? 0}
              </span>
              Followers
            </p>
          </div>

          {profileData && profileData.mutuals.length > 0 && (
            <div className="flex items-start gap-2">
              <div
                className="relative h-7 shrink-0"
                style={{ width: `${16 + profileData.mutuals.length * 10}px` }}
              >
                {profileData.mutuals.map((mutual, i) => (
                  <div
                    key={mutual.id}
                    className="absolute top-0 h-7 w-7 overflow-hidden rounded-full border border-black bg-gray-700"
                    style={{
                      left: `${i * 10}px`,
                      zIndex: profileData.mutuals.length - i,
                    }}
                  >
                    <Image
                      src={mutual.image || "/default-profile.png"}
                      alt={mutual.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>

              <div className="min-w-0 flex-1 text-xs text-gray-500">
                <p>
                  Followed by{" "}
                  {profileData.mutuals
                    .slice(0, 2)
                    .map((mutual) => mutual.name)
                    .join(", ")}
                  {profileData.mutualsCount > 2 &&
                    ` and ${profileData.mutualsCount - 2} others you follow`}
                </p>
              </div>
            </div>
          )}

          <div className="mt-auto flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-400 hover:bg-white/10">
            <button className="px-4 py-1.5 text-sm font-bold">
              Profile Summary
            </button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfilePopover;
