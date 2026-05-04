"use client";
import { ProfileTab } from "@/types";
import Link from "next/link";
import React from "react";

const tabs: { label: string; value: ProfileTab }[] = [
  { label: "Posts", value: "posts" },
  { label: "Replies", value: "replies" },
  { label: "Media", value: "media" },
  { label: "Likes", value: "likes" },
];

const ProfileTabs = ({
  username,
  activeTab,
}: {
  username: string;
  activeTab: ProfileTab;
}) => {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/${username}?tab=${tab.value}`}
              className="relative flex-1 py-4 text-center text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <span
                className={
                  isActive
                    ? "font-bold text-black dark:text-white"
                    : "font-normal text-zinc-500"
                }
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-sky-500" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
