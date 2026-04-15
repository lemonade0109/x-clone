"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex h-11 w-full items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 text-zinc-500 transition focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-sky-500">
      <Search className="h-5 w-5 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search(todo)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
