import React from "react";
import { Ellipsis, Search } from "lucide-react";

const tabs = ["For you", "Trending", "News", "Sports", "Entertainment"];

const trends = [
  {
    category: "Trending in Technology",
    topic: "#NextJS",
    posts: "24.1K posts",
  },
  {
    category: "Software Development",
    topic: "Tailwind v4",
    posts: "12.8K posts",
  },
  {
    category: "Trending",
    topic: "#TypeScript",
    posts: "56.3K posts",
  },
  {
    category: "Technology · Trending",
    topic: "App Router",
    posts: "9,842 posts",
  },
  {
    category: "Trending in Nigeria",
    topic: "#BuildInPublic",
    posts: "6,341 posts",
  },
];

const ExplorePageSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-full items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 text-zinc-500 transition focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-sky-500">
            <Search className="h-5 w-5" />
            <input
              placeholder="Search"
              className="w-full bg-transparent text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-2 grid grid-cols-5 text-[15px]">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`relative py-4 font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                index === 0 ? "text-black dark:text-white font-semibold" : "text-zinc-500"
              }`}
            >
              {tab}
              {index === 0 ? (
                <span className="absolute right-4 bottom-0 left-4 h-1 rounded-full bg-sky-500" />
              ) : null}
            </button>
          ))}
        </div>
      </header>

      <article className="cursor-pointer border-b border-zinc-200 dark:border-zinc-800 transition hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <div className="relative h-52 w-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_100%)]">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute right-4 bottom-4 left-4 text-white">
            <p className="text-sm font-medium">Technology · Trending</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
              Web Development in 2026
            </h2>
            <p className="mt-1 text-sm text-white/90">92.7K posts</p>
          </div>
        </div>
      </article>

      <section>
        {trends.map((trend) => (
          <button
            key={trend.topic}
            className="flex w-full items-start justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <div>
              <p className="text-xs text-zinc-500">{trend.category}</p>
              <p className="mt-0.5 text-[15px] font-extrabold text-zinc-900 dark:text-zinc-100">
                {trend.topic}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{trend.posts}</p>
            </div>
            <Ellipsis className="mt-0.5 h-5 w-5 text-zinc-500" />
          </button>
        ))}
      </section>
    </section>
  );
};

export default ExplorePageSection;
