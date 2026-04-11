"use client";

import React from "react";
import ProfileDropdownMenu from "../homepage/profile-dropdown-menu";
import MoreDropdownMenu from "../homepage/more-dropdown-menu";
import Link from "next/link";
import { Home, Search, Bell, Mail, Bookmark, Users, User } from "lucide-react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export type UserProfile = {
  name: string;
  email?: string;
  username: string;
  image: string;
};

const NavLayoutTemplate = ({ username, name, image }: UserProfile) => {
  const pathname = usePathname();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
      isActive: pathname === "/home" || pathname === "/",
    },
    {
      icon: Search,
      label: "Explore",
      href: "/explore",
      isActive: pathname.startsWith("/explore"),
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      isActive: pathname.startsWith("/notifications"),
    },
    {
      icon: Mail,
      label: "Chat",
      href: "/i/chat",
      isActive: pathname.startsWith("/i/chat"),
    },
    {
      icon: Bookmark,
      label: "Bookmarks",
      href: "/i/bookmarks",
      isActive: pathname.startsWith("/i/bookmarks"),
    },

    {
      icon: User,
      label: "Profile",
      href: `/${username}`,
      isActive:
        pathname === `/${username}` ||
        pathname.startsWith(`/${username}/lists`) ||
        pathname.startsWith(`/${username}/compose`) ||
        pathname.startsWith(`/${username}/premium_sign_up`),
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-22 shrink-0 border-r border-zinc-200 dark:border-zinc-800 px-3 py-3 lg:block xl:w-68.75">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-1 ">
          <Link
            href="/home"
            className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full  transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {/* <Image
              alt="x image"
              src="/image.jpg"
              width={58}
              height={58}
              className="object-contain mx-auto"
            /> */}
            <FaXTwitter className="w-7 h-7" />
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
              className="group flex items-center gap-4 rounded-full px-3 py-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <item.icon
                className="h-7 w-7"
                strokeWidth={item.isActive ? 2.5 : 2.1}
              />
              <span
                className={`hidden text-xl xl:inline ${item.isActive ? "font-bold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </Link>
          ))}

          <MoreDropdownMenu username={username} />

          <button className="mt-10 hidden w-full rounded-full bg-black dark:bg-white px-8 py-3 text-[15px] font-bold text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-white/90 xl:block">
            Post
          </button>
        </div>

        <ProfileDropdownMenu username={username} name={name} image={image} />
      </div>
    </aside>
  );
};

export default NavLayoutTemplate;
