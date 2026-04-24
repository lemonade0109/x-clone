"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "../shared/nav-layout-template";

export default function ProfileDropdownMenu({
  username,
  name,
  profileImage,
}: UserProfile) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="mb-1 flex items-center gap-3 rounded-full px-3 py-3 text-left"
        aria-hidden
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 font-semibold">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            name.charAt(0)
          )}
        </div>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="mb-1 flex items-center gap-3 rounded-full px-3 py-3 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 font-semibold">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div className="hidden leading-tight xl:block">
            <p className="text-md font-bold">{name}</p>
            <p className="text-sm text-zinc-500">@{username}</p>
          </div>
          <Ellipsis className="ml-auto hidden h-5 w-5 xl:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-80 rounded-2xl border border-zinc-200/90 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5 shadow-[0_8px_24px_rgba(15,20,25,0.18)]"
      >
        <p className="px-4 py-2 text-sm text-zinc-500">
          Signed in as @{username}
        </p>
        <hr className="my-1 border-zinc-200 dark:border-zinc-700" />

        <div className="flex flex-col ml-1 my-2 space-y-3">
          <Link
            href="/i/flow/login"
            className="w-full text-left px-4 py-2 rounded-md text-md font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Add an existing account
          </Link>

          <Link
            href="/logout"
            className="w-full text-left px-4 py-2 rounded-md text-md font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Logout @{username}
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
