"use client";

import { getSuggestedUsersAction } from "@/lib/actions/user/get-suggested-users-action";
import { SuggestedUser } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import ProfilePopover from "../homepage/post/profile-popover";
import FollowButton from "../page/sections/profile/follow-button";

const WhoToFollowListClient = () => {
  const [users, setUsers] = React.useState<SuggestedUser[]>([]);

  const loadUsers = async () => {
    const data = await getSuggestedUsersAction();

    setUsers(data);
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  const handleFollowSuccess = (userId: string) => {
    setUsers((prevUser) => prevUser.filter((user) => user.id !== userId));
  };

  if (users.length === 0) {
    return (
      <p className="px-4 py-3 text-sm text-zinc-500">No suggestions yet.</p>
    );
  }

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between px-4 py-3 transition hover:bg-zinc-200 dark:hover:bg-zinc-800/30"
        >
          <ProfilePopover
            userId={user.id}
            name={user.name}
            userName={user.username || ""}
            profileImage={user.image || ""}
            bio={user.bio || ""}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-sm font-bold text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300">
                    {user.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
              </div>

              <div className="min-w-0 leading-tight">
                <Link
                  href={`/${user.username}`}
                  className="flex items-center gap-1 truncate text-sm font-bold hover:underline"
                >
                  {user.name}
                  {user.verified && (
                    <BadgeCheck className="h-4 w-4 flex-shrink-0 fill-sky-500 text-white" />
                  )}
                </Link>
                <p className="truncate text-sm text-zinc-500">
                  @{user.username ?? ""}
                </p>
              </div>
            </div>
          </ProfilePopover>

          <FollowButton
            targetUserId={user.id}
            isFollowing={
              (user as { isFollowing?: boolean }).isFollowing ?? false
            }
            onSuccess={() => handleFollowSuccess(user.id)}
          />
        </div>
      ))}
    </>
  );
};

export default WhoToFollowListClient;
