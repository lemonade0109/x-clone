"use client";
import React from "react";

const tabs = ["Posts", "Replies", "Media", "Likes"];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = React.useState("Posts");

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="relative flex-1 py-4 text-center text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <span
                className={
                  isActive
                    ? "font-bold text-black dark:text-white"
                    : "font-normal text-zinc-500"
                }
              >
                {tab}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-sky-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
