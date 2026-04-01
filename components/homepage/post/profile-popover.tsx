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

      <HoverCardContent className=" h-[280px] w-[240px] bg-black rounded-2xl shadow-lg shadow-white/30">
        <div className="flex flex-col text-white gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center w-8 h-8 relative">
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
              <Button className="rounded-full px-6 py-4 text-md font-bold hover:bg-white/15">
                Follow
              </Button>
            </div>
          </div>

          <div className="text-start">
            <p className="text-xl font-bold">{name}</p>
            <p className="text-md text-gray-500">@{userName}</p>
          </div>

          <div className="text-md">
            <p>
              {bio ||
                "(TODO)Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto consectetur quod impedit commodi fuga sit id natus perferendis!💥"}
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <p className="text-md text-gray-500">
              <span className="font-bold text-white px-2">14.4k</span>
              Following
            </p>
            <p className="text-md text-gray-500 ">
              <span className="font-bold text-white">1004</span>
              Followers
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center relative">
              <div className="bg-gray-500 border border-red-400 rounded-full w-8 h-8  z-20 "></div>
              <div className="bg-gray-500 border border-blue-400 rounded-full w-8 h-8  z-10 absolute top-0 left-3"></div>
              <div className="bg-gray-500 border border-green-400 rounded-full w-8 h-8 z-0 "></div>
            </div>

            <div className=" max-w-48 text-gray-500 text-sm">
              <p>Followed by {userName}, and 3 others you follow</p>
            </div>
          </div>

          <div className="flex mt-3 items-center justify-center w-full h-auto border border-gray-400 rounded-full hover:bg-white/10 cursor-pointer">
            <button className="px-6 py-2 text-xl font-bold">
              Profile Summary
            </button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfilePopover;
