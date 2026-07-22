import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ProfilePopover: React.FC<{
  name: string | undefined;
  userName: string | undefined;
  profileImage: string | undefined;
  bio: string | undefined;
  children: React.ReactNode;
}> = ({ name, userName, profileImage, bio, children }) => {
  return (
    <HoverCard openDelay={500} closeDelay={200}>
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
              <Button className="h-8 rounded-full px-3 text-xs font-bold hover:bg-white/15">
                Follow
              </Button>
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
              <span className="pr-1 font-bold text-white">14.4k</span>
              Following
            </p>
            <p className="text-gray-500">
              <span className="font-bold text-white">1004</span>
              Followers
            </p>
          </div>

          <div className="flex items-start gap-2">
            <div className="relative h-7 w-12 shrink-0">
              <div className="absolute left-0 top-0 z-20 h-7 w-7 rounded-full border border-red-400 bg-gray-500"></div>
              <div className="absolute left-2.5 top-0 z-10 h-7 w-7 rounded-full border border-blue-400 bg-gray-500"></div>
              <div className="absolute left-5 top-0 z-0 h-7 w-7 rounded-full border border-green-400 bg-gray-500"></div>
            </div>

            <div className="min-w-0 flex-1 text-xs text-gray-500">
              <p>Followed by {userName}, and 3 others you follow</p>
            </div>
          </div>

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
