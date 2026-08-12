"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import type { QuickUser, RecentSearch } from "@/types";
import { searchUserAction } from "@/lib/actions/user/search-user-action";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT = 8;

const SearchBar = () => {
  const router = useRouter();
  const containedRef = React.useRef<HTMLDivElement>(null);

  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [results, setResults] = React.useState<QuickUser[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>(
    [],
  );

  // Load Recent Searches On Mount
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

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced live search
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
    }, 300);
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

  return (
    <div ref={containedRef} className="relative">
      <div className="flex h-11 w-full items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 text-zinc-500 transition  focus-within:ring-1 focus-within:ring-sky-500">
        <Search className="h-5 w-5 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="flex h-4.5 w-5 items-center justify-center rounded-full  hover:bg-zinc-800 dark:bg-white cursor-pointer "
          >
            <X className="h-2.5 w-2.5 font-extrabold dark:text-black text-white" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
