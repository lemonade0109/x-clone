"use client";

import React from "react";
import { Ellipsis, Search } from "lucide-react";
import { TrendingTopic } from "@/types";

const tabs = ["For you", "Trending", "News", "Sports", "Entertainment"];

type Props = {
  topics: TrendingTopic[];
};

const ExplorePageSection: React.FC<Props> = ({ topics }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [hero, ...trends] = topics;

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
              className={`relative py-4 font-medium transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30 ${
                index === 0
                  ? "text-black dark:text-white font-semibold"
                  : "text-zinc-500"
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

      {hero && (
        <article className="cursor-pointer border-b border-zinc-200 dark:border-zinc-800 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30">
          <div className="relative h-52 w-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_100%)]">
            <div className="absolute inset-0 bg-black/20" />

            <p className="absolute bottom-4 left-4 text-sm font-medium text-white">
              {hero.category} • Trending
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
              #{hero.tag}
            </h2>
            <p className="mt-1 text-sm text-white/90">
              {hero.postCount.toLocaleString()} posts
            </p>
          </div>
        </article>
      )}

      <section>
        {trends.map((trend) => (
          <button
            key={trend.tag}
            className="flex w-full items-start justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30"
          >
            <div>
              <p className="text-xs text-zinc-500">{trend.category}</p>
              <p className="mt-0.5 text-[15px] font-extrabold text-zinc-900 dark:text-zinc-100">
                #{trend.tag}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {trend.postCount.toLocaleString()} posts
              </p>
            </div>
            <Ellipsis className="mt-0.5 h-5 w-5 text-zinc-500" />
          </button>
        ))}
      </section>
    </section>
  );
};

export default ExplorePageSection;
