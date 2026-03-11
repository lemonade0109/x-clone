import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import { Ellipsis, Search, Verified } from "lucide-react";
import React from "react";

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

const news = [
  {
    title: "Open-source AI tooling keeps accelerating",
    source: "TechWire",
    time: "2h",
  },
  {
    title: "React ecosystem doubles down on performance",
    source: "Frontend Daily",
    time: "4h",
  },
  {
    title: "New creator programs launched this week",
    source: "Startup Hub",
    time: "7h",
  },
];

export default function ExplorePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate userId={"@jubril1234"} />

      <section className="min-h-screen w-full max-w-150 border-r border-zinc-200">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-full items-center gap-3 rounded-full bg-zinc-100 px-4 text-zinc-500 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500">
              <Search className="h-5 w-5" />
              <input
                placeholder="Search"
                className="w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-5 text-[15px]">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`relative py-4 font-medium transition hover:bg-zinc-100 ${
                  index === 0 ? "text-black font-semibold" : "text-zinc-500"
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

        <article className="cursor-pointer border-b border-zinc-200 transition hover:bg-zinc-50">
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
              className="flex w-full items-start justify-between border-b border-zinc-200 px-4 py-3 text-left transition hover:bg-zinc-50"
            >
              <div>
                <p className="text-xs text-zinc-500">{trend.category}</p>
                <p className="mt-0.5 text-[15px] font-extrabold text-zinc-900">
                  {trend.topic}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{trend.posts}</p>
              </div>
              <Ellipsis className="mt-0.5 h-5 w-5 text-zinc-500" />
            </button>
          ))}
        </section>
      </section>

      <aside className="sticky top-0 hidden h-screen min-w-82.5 flex-1 px-8 py-2 lg:block">
        <div className="sticky top-2 space-y-4">
          <div className="border border-gray-300 my-4" />

          <section className="rounded-2xl bg-zinc-100 py-3">
            <h2 className="px-4 pb-2 text-xl font-extrabold">
              What&apos;s happening
            </h2>
            {news.map((item) => (
              <button
                key={item.title}
                className="w-full px-4 py-3 text-left transition hover:bg-zinc-200/70"
              >
                <p className="text-xs text-zinc-500">
                  {item.source} · {item.time}
                </p>
                <p className="mt-0.5 text-[15px] font-bold text-zinc-900">
                  {item.title}
                </p>
              </button>
            ))}
          </section>

          <section className="rounded-2xl bg-zinc-100 py-3">
            <h2 className="px-4 pb-2 text-xl font-extrabold">Who to follow</h2>
            {[
              { name: "Vercel", handle: "@vercel", verified: true },
              { name: "TypeScript", handle: "@typescript", verified: false },
              { name: "Next.js", handle: "@nextjs", verified: true },
            ].map((person) => (
              <div
                key={person.handle}
                className="flex items-center justify-between px-4 py-3 transition hover:bg-zinc-200/70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-sm font-bold">
                    {person.name[0]}
                  </div>
                  <div className="leading-tight">
                    <p className="flex items-center gap-1 text-sm font-bold">
                      {person.name}
                      {person.verified ? (
                        <Verified className="h-4 w-4 fill-sky-500 text-white" />
                      ) : null}
                    </p>
                    <p className="text-sm text-zinc-500">{person.handle}</p>
                  </div>
                </div>
                <button className="rounded-full bg-black px-4 py-1.5 text-sm font-bold text-white transition hover:bg-zinc-800">
                  Follow
                </button>
              </div>
            ))}
          </section>
        </div>
      </aside>
    </main>
  );
}
