import { Ellipsis, Search } from "lucide-react";
import React from "react";

const trends = [
  {
    category: "Trending in Technology",
    topic: "#NextJS",
    posts: "23.8K posts",
  },
  { category: "Trending", topic: "#TypeScript", posts: "51.2K posts" },
  { category: "Software Development", topic: "React 19", posts: "12.4K posts" },
];
const TrendingSideBar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen min-w-[320px] flex-1 px-8 py-2 lg:block">
      <div className="sticky top-2 space-y-4">
        <div className="rounded-full bg-zinc-100 px-4 py-3">
          <div className="flex items-center gap-3 text-zinc-500">
            <Search className="h-5 w-5" />
            <span className="text-[15px]">Search</span>
          </div>
        </div>

        <section className="rounded-2xl bg-zinc-100 py-3">
          <h2 className="px-4 pb-2 text-xl font-extrabold">Trends for you</h2>
          {trends.map((trend) => (
            <button
              key={trend.topic}
              className="flex w-full items-start justify-between px-4 py-3 text-left transition hover:bg-zinc-200/70"
            >
              <div>
                <p className="text-xs text-zinc-500">{trend.category}</p>
                <p className="text-[15px] font-bold">{trend.topic}</p>
                <p className="text-xs text-zinc-500">{trend.posts}</p>
              </div>
              <Ellipsis className="h-5 w-5 text-zinc-500" />
            </button>
          ))}
        </section>

        <section className="rounded-2xl bg-zinc-100 py-3">
          <h2 className="px-4 pb-2 text-xl font-extrabold">Who to follow</h2>
          {[
            { name: "Vercel", handle: "@vercel" },
            { name: "TypeScript", handle: "@typescript" },
          ].map((person) => (
            <div
              key={person.handle}
              className="flex items-center justify-between px-4 py-3 transition hover:bg-zinc-200/70"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-300" />
                <div className="leading-tight">
                  <p className="text-sm font-bold">{person.name}</p>
                  <p className="text-sm text-zinc-500">{person.handle}</p>
                </div>
              </div>
              <button className="rounded-full bg-black px-4 py-1.5 text-sm font-bold text-white hover:bg-zinc-800">
                Follow
              </button>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default TrendingSideBar;
