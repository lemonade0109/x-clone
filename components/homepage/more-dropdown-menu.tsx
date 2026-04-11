"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BowArrow, List, Podcast, Settings, Users, Zap } from "lucide-react";
import { MdMoreHoriz } from "react-icons/md";
import Link from "next/link";

export default function MoreDropdownMenu({ username }: { username: string }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const dropdownLinks = [
    {
      href: `/${username}/lists`,
      name: "List",
      icon: List,
    },
    {
      href: `/${username}/communities`,
      name: "Communities",
      icon: Users,
    },
    {
      href: "/#",
      name: "Business",
      icon: Zap,
    },
    {
      href: "/#",
      name: "Ads",
      icon: BowArrow,
    },
    {
      href: "/#",
      name: "Create your Space",
      icon: Podcast,
    },
    {
      href: "/settings",
      name: "Settings and Privacy",
      icon: Settings,
      dividerBefore: true,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className=" inline-flex h-12 w-12 items-center justify-center gap-4 rounded-full px-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 xl:w-auto"
        >
          <MdMoreHoriz className="h-7 w-7" />
          <span className="hidden text-xl font-medium xl:inline">More</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={-9}
        align="start"
        className="w-80 rounded-2xl border border-zinc-200/90 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5 shadow-[0_8px_24px_rgba(15,20,25,0.18)]"
      >
        {dropdownLinks.map((link) => (
          <React.Fragment key={link.name}>
            {link.dividerBefore ? (
              <DropdownMenuSeparator className="my-1.5" />
            ) : null}
            <DropdownMenuItem
              asChild
              className="rounded-xl px-4 py-0 focus:bg-zinc-100 dark:focus:bg-zinc-800"
            >
              <Link
                href={link.href}
                className="flex min-h-13 w-full items-center gap-3 text-sm leading-5 font-bold text-zinc-900 dark:text-zinc-100"
              >
                <link.icon
                  className="h-5 w-5 text-zinc-900 dark:text-zinc-100"
                  strokeWidth={2.2}
                />
                <span>{link.name}</span>
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
