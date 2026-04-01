import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const ProfilePopover: React.FC<{
  name: string | undefined;
  userName: string | undefined;
  profileImage: string | undefined;
  bio: string | undefined;
  children: React.ReactNode;
}> = ({ name, userName, profileImage, bio, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent className=" h-auto w-100 bg-black rounded-2xl shadow-lg shadow-white/30  ">
          <div className="flex flex-col space-y-2 text-white py-2">
            <div className="flex items-center justify-between space-x-2 py-3 px-3">
              <div className="flex items-center justify-center w-16 h-16 relative">
                <Link href={`/${userName}`}>
                  <Image
                    src={profileImage!}
                    alt="profile image"
                    fill
                    className="rounded-full"
                  />
                </Link>
              </div>

              <div>
                <Button className="rounded-full px-8 py-6 text-xl font-bold">
                  Follow
                </Button>
              </div>
            </div>

            <div className="">
              <p className="text-2xl font-bold px-2">{name}</p>
              <p className="text-lg text-gray-500">@{userName}</p>
            </div>

            <div className=" text-xl py-2 ">
              <p>
                {/* NOT more than 120 words */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                consectetur quod impedit commodi fuga sit id natus perferendis!
                💥
              </p>
              <div>{bio}</div>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-xl text-gray-500">
                <span className="font-bold text-white px-2">14.4k</span>
                Following
              </p>
              <p className="text-xl text-gray-500 ">
                <span className="font-bold  text-white px-2">1004</span>
                Followers
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center relative">
                <div className="bg-gray-500 border border-red-400 rounded-full w-8 h-8  z-20 "></div>
                <div className="bg-gray-500 border border-blue-400 rounded-full w-8 h-8  z-10 absolute top-0 left-3"></div>
                <div className="bg-gray-500 border border-green-400 rounded-full w-8 h-8 z-0 "></div>
              </div>

              <div className=" max-w-52 text-gray-500 text-lg">
                <p>Followed by {userName}, and 3 others you follow</p>
              </div>
            </div>

            <div className="flex items-center justify-center w-full h-auto border border-gray-400 rounded-full">
              <button className="px-8 py-3 text-2xl font-bold">
                Profile Summary
              </button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfilePopover;
