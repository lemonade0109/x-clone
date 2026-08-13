"use client";

import { BadgeCheck, Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import type { QuickUser, RecentSearch } from "@/types";
import { searchUserAction } from "@/lib/actions/user/search-user-action";
import Image from "next/image";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT = 8;
type SearchTab = "people" | "posts" | "topics";

const SearchBar = () => {
  const router = useRouter();
  const containedRef = React.useRef<HTMLDivElement>(null);

  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<SearchTab>("people");
  const [isPending, startTransition] = React.useTransition();
  const [results, setResults] = React.useState<QuickUser[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>(
    [],
  );

  React.useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(RECENT_SEARCHES_KEY) || "[]",
      );
      if (Array.isArray(saved)) {
        setRecentSearches(saved);
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containedRef.current &&
        !containedRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      startTransition(async () => {
        const users = await searchUserAction(trimmed);
        setResults(users);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const persistRecentSearches = (list: RecentSearch[]) => {
    setRecentSearches(list);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
  };

  const addRecentSearch = (entry: RecentSearch) => {
    const isDuplicate = (item: RecentSearch) =>
      entry.type === "query"
        ? item.type === "query" &&
          item.text.toLowerCase() === entry.text.toLowerCase()
        : item.type === "user" && item.id === entry.id;

    const next = [
      entry,
      ...recentSearches.filter((item) => !isDuplicate(item)),
    ].slice(0, MAX_RECENT);

    persistRecentSearches(next);
  };

  const removeRecentSearch = (index: number) => {
    persistRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  const clearRecentSearches = () => {
    persistRecentSearches([]);
  };

  const goToExplore = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    addRecentSearch({ type: "query", text: trimmed });
    setIsOpen(false);
    router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  const goToUserProfile = (user: QuickUser) => {
    addRecentSearch({
      type: "user",
      id: user.id,
      image: user.image,
      name: user.name,
      username: user.username,
      bio: user.bio ?? null,
      verified: user.verified ?? false,
    });
    setIsOpen(false);
    router.push(`/${user.username ?? ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      goToExplore(query);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const trimmedQuery = query.trim();
  const showRecent = isOpen && !trimmedQuery && recentSearches.length > 0;
  const showResults = isOpen && !!trimmedQuery;

  const tabs: SearchTab[] = ["people", "posts", "topics"];

  const renderPeople = () => {
    if (isPending) {
      return (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
        </div>
      );
    }

    if (!results.length) {
      return (
        <div className="px-4 py-3 text-sm text-zinc-500">
          No people found for “{trimmedQuery}”
        </div>
      );
    }

    return results.map((user) => (
      <button
        key={user.id}
        type="button"
        onClick={() => goToUserProfile(user)}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <div className="relative h-9 w-9 flex-shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        <div className="min-w-0 leading-tight">
          <p className="flex items-center gap-1 truncate text-[15px] font-bold text-zinc-900 dark:text-white">
            {user.name}
            {user.verified ? (
              <BadgeCheck className="h-4 w-4 flex-shrink-0 fill-sky-500 text-white" />
            ) : null}
          </p>
          <p className="truncate text-sm text-zinc-500">
            @{user.username ?? ""}
          </p>
        </div>
      </button>
    ));
  };

  const renderPosts = () => (
    <button
      type="button"
      onClick={() => goToExplore(trimmedQuery)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
    >
      <Search className="h-5 w-5 text-zinc-500" />
      <span className="text-[15px]">
        Search posts for &quot;
        <span className="font-semibold">{trimmedQuery}</span>&quot;
      </span>
    </button>
  );

  const renderTopics = () => (
    <button
      type="button"
      onClick={() => goToExplore(trimmedQuery)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
    >
      <Search className="h-5 w-5 text-zinc-500" />
      <span className="text-[15px]">
        Search topics for &quot;
        <span className="font-semibold">{trimmedQuery}</span>&quot;
      </span>
    </button>
  );

  return (
    <div ref={containedRef} className="relative">
      <div className="flex h-11 w-full items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-4 text-zinc-500 transition focus-within:ring-1 focus-within:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900">
        <Search className="h-5 w-5 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-500 outline-none dark:text-zinc-100"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(true);
            }}
            className="flex h-4.5 w-5 items-center justify-center rounded-full  hover:bg-zinc-800 dark:bg-white cursor-pointer "
          >
            <X className="h-2.5 w-2.5 font-extrabold dark:text-black text-white" />
          </button>
        ) : null}
      </div>

      {showRecent || showResults ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-black">
          {showRecent ? (
            <div>
              <div className="flex items-center justify-between px-4 pb-1 pt-3">
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  Recent
                </h3>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="text-sm font-bold text-sky-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((entry, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between px-4 py-2.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <button
                    type="button"
                    onClick={() =>
                      entry.type === "query"
                        ? goToExplore(entry.text)
                        : goToUserProfile(entry)
                    }
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    {entry.type === "user" ? (
                      <div className="relative h-9 w-9 flex-shrink-0">
                        {entry.image ? (
                          <Image
                            src={entry.image}
                            alt={entry.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300">
                            {entry.name?.[0]?.toUpperCase() ?? "?"}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <Search className="h-4 w-4" />
                      </span>
                    )}

                    <span className="min-w-0 truncate text-[15px] text-zinc-900 dark:text-white">
                      {entry.type === "query" ? entry.text : entry.name}
                    </span>
                    {entry.type === "user" ? (
                      <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                        @{entry.username}
                      </span>
                    ) : null}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeRecentSearch(index)}
                    className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-zinc-500 opacity-0 transition hover:bg-zinc-200 group-hover:opacity-100 dark:hover:bg-zinc-800"
                    aria-label="Remove recent search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {showResults ? (
            <div>
              <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-3 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-sky-500 text-sky-500"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-2">
                {activeTab === "people" && renderPeople()}
                {activeTab === "posts" && renderPosts()}
                {activeTab === "topics" && renderTopics()}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
