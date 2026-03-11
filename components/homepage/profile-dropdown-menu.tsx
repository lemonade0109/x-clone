import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ProfileDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="mb-1 flex items-center gap-3 rounded-full px-3 py-3 text-left transition hover:bg-zinc-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-semibold">
            J
          </div>
          <div className="hidden leading-tight xl:block">
            <p className="text-sm font-semibold">Jubril</p>
            <p className="text-sm text-zinc-500">@jubril</p>
          </div>
          <Ellipsis className="ml-auto hidden h-5 w-5 xl:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-80 rounded-2xl border border-zinc-200/90 bg-white p-1.5 shadow-[0_8px_24px_rgba(15,20,25,0.18)]"
      >
        <p className="px-4 py-2 text-sm text-zinc-500">Signed in as @jubril</p>
        <hr className="my-1 border-zinc-200" />

        <div className="flex flex-col ml-1 my-2 space-y-3">
          <Link
            href="/i/flow/login"
            className="w-full text-left px-4 py-2 rounded-md text-md font-semibold transition hover:bg-zinc-100"
          >
            Add an existing account
          </Link>

          <Link
            href="/i/flow/logout"
            className="w-full text-left px-4 py-2 rounded-md text-md font-semibold transition hover:bg-zinc-100"
          >
            Logout @jubril
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
