"use client";

import React, { useState, useEffect } from "react";
import { Ellipsis, Search, ArrowLeft, X } from "lucide-react";
import { TrendingTopic, PostItem } from "@/types";
import { useRouter } from "next/navigation";
import AllPostsContainer from "@/components/homepage/post/all-posts-container";

const defaultTabs = ["For you", "Trending", "News", "Sports", "Entertainment"];
const searchTabs = ["Top", "Latest", "People", "Media"];

type Props = {
  topics: TrendingTopic[];
  query?: string;
  posts?: PostItem[];
  currentUser?: { id: string; image?: string | null } | null;
};

const ExplorePageSection: React.FC<Props> = ({
  topics,
  query = "",
  posts = [],
  currentUser,
}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(query);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const [hero, ...trends] = topics;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/explore");
    }
  };

  const handleTopicClick = (tag: string) => {
    router.push(`/explore?q=${encodeURIComponent(`#${tag}`)}`);
  };

  const clearSearch = () => {
    setSearchInput("");
    router.push("/explore");
  };

  const heroLabel =
    hero?.category === "Trending"
      ? hero.category
      : `${hero?.category ?? ""} • Trending`;

  const tabs = query ? searchTabs : defaultTabs;

  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      {/* Sticky Header with Search Input */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="Back to explore"
            >
              <ArrowLeft className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
            </button>
          ) : null}

          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="flex h-11 w-full items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 text-zinc-500 transition focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-sky-500">
              <Search className="h-5 w-5 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
              {searchInput ? (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </div>
          </form>
        </div>

        {/* Tab navigation */}
        <div className="mt-2 grid grid-flow-col auto-cols-fr text-[15px]">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`relative py-4 font-medium transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30 ${
                activeTab === index
                  ? "text-black dark:text-white font-semibold"
                  : "text-zinc-500"
              }`}
            >
              {tab}
              {activeTab === index ? (
                <span className="absolute right-4 bottom-0 left-4 h-1 rounded-full bg-sky-500" />
              ) : null}
            </button>
          ))}
        </div>
      </header>

      {/* When a search query is active */}
      {query ? (
        <div>
          {posts.length === 0 ? (
            <div className="mx-auto flex max-w-sm flex-col items-start justify-center px-8 py-16 text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                No results for &quot;{query}&quot;
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                Try searching for something else, or check for spelling errors.
              </p>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <AllPostsContainer
                  key={post.id}
                  post={post}
                  currentUser={{
                    id: currentUser?.id ?? "",
                    image: currentUser?.image ?? null,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Default Explore View (Hero + Trends List) */
        <>
          {hero && (
            <article
              onClick={() => handleTopicClick(hero.tag)}
              className="cursor-pointer border-b border-zinc-200 dark:border-zinc-800 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30"
            >
              <div className="relative h-52 w-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_100%)]">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium text-white/90">
                    {heroLabel}
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                    #{hero.tag}
                  </h2>
                  <p className="mt-1 text-sm text-white/90">
                    {hero.postCount.toLocaleString()} posts
                  </p>
                </div>
              </div>
            </article>
          )}

          <section>
            {trends.map((trend) => (
              <button
                key={trend.tag}
                onClick={() => handleTopicClick(trend.tag)}
                className="flex w-full items-start justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30 cursor-pointer"
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
                <div onClick={(e) => e.stopPropagation()}>
                  <Ellipsis className="mt-0.5 h-5 w-5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200" />
                </div>
              </button>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default ExplorePageSection;
