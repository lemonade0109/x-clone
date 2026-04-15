import { Ellipsis, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./search-bar";
import { getSuggestedUsersAction } from "@/lib/actions/profile/get-suggested-users-action";

const trends = [
  {
    category: "Trending in Technology",
    topic: "#NextJS",
    posts: "23.8K posts",
  },
  { category: "Trending", topic: "#TypeScript", posts: "51.2K posts" },
  {
    category: "Software Development",
    topic: "React 19",
    posts: "12.4K posts",
  },
  {
    category: "Trending in Nigeria",
    topic: "#BuildInPublic",
    posts: "6.3K posts",
  },
];

const TrendingSideBar = async () => {
  const suggestedUsers = await getSuggestedUsersAction();

  return (
    <aside className="sticky top-0 hidden h-screen min-w-[320px] flex-col px-4 py-2 lg:flex">
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
        {/* Search bar */}
        <div className="sticky top-0 bg-white dark:bg-black py-2 z-10 px-2">
          <SearchBar />
        </div>

        {/* Trends for you */}
        <section className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/60">
          <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold">
            Trends for you
          </h2>
          {trends.map((trend) => (
            <Link
              key={trend.topic}
              href={`/explore?q=${encodeURIComponent(trend.topic)}`}
              className="flex w-full items-start justify-between px-4 py-3 text-left transition hover:bg-zinc-200/70 dark:hover:bg-zinc-700/50"
            >
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">{trend.category}</p>
                <p className="text-[15px] font-bold">{trend.topic}</p>
                <p className="text-xs text-zinc-500">{trend.posts}</p>
              </div>
              <Ellipsis className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-500" />
            </Link>
          ))}
          <Link
            href="/explore"
            className="block rounded-b-2xl px-4 py-3 text-sm text-sky-500 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-700/50"
          >
            Show more
          </Link>
        </section>

        {/* Who to follow */}
        <section className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/60">
          <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold">
            Who to follow
          </h2>

          {suggestedUsers.length === 0 ? (
            <p className="px-4 py-3 text-sm text-zinc-500">
              No suggestions yet.
            </p>
          ) : (
            suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-4 py-3 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-700/50"
              >
                <Link
                  href={`/${user.username ?? ""}`}
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="relative h-10 w-10 flex-shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-600 text-sm font-bold text-zinc-600 dark:text-zinc-300">
                        {user.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="flex items-center gap-1 text-sm font-bold truncate">
                      {user.name}
                      {user.verified && (
                        <BadgeCheck className="h-4 w-4 flex-shrink-0 fill-sky-500 text-white" />
                      )}
                    </p>
                    <p className="text-sm text-zinc-500 truncate">
                      @{user.username ?? ""}
                    </p>
                  </div>
                </Link>
                <button className="ml-3 flex-shrink-0 rounded-full bg-black px-4 py-1.5 text-sm font-bold text-white transition hover:bg-zinc-800">
                  Follow
                </button>
              </div>
            ))
          )}

          <Link
            href="/explore"
            className="block rounded-b-2xl px-4 py-3 text-sm text-sky-500 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-700/50"
          >
            Show more
          </Link>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap gap-x-2 gap-y-1 px-4 pb-4 text-xs text-zinc-500">
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Cookie Policy
          </Link>
          <Link href="#" className="hover:underline">
            Accessibility
          </Link>
          <Link href="#" className="hover:underline">
            Ads info
          </Link>
          <span>© 2026 X Corp.</span>
        </footer>
      </div>
    </aside>
  );
};

export default TrendingSideBar;
