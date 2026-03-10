import {
  Bell,
  Bookmark,
  Ellipsis,
  Home,
  Image as ImageIcon,
  Mail,
  Search,
  User,
  Users,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tabs = ["For you", "Following"];

const posts = [
  {
    id: 1,
    name: "OpenAI",
    handle: "@OpenAI",
    time: "2h",
    text: "Building fast means shipping, learning, and iterating. What are you building this week?",
    stats: { replies: "128", reposts: "320", likes: "2.1K", views: "91K" },
    verified: true,
  },
  {
    id: 2,
    name: "Frontend Weekly",
    handle: "@FrontendDaily",
    time: "5h",
    text: "Small UX details scale: spacing rhythm, readable type, and clear interaction states.",
    stats: { replies: "42", reposts: "76", likes: "909", views: "37K" },
    verified: false,
  },
  {
    id: 3,
    name: "Next.js",
    handle: "@nextjs",
    time: "8h",
    text: "App Router keeps getting better. Streaming + Server Components can simplify your app architecture.",
    stats: { replies: "67", reposts: "190", likes: "1.6K", views: "63K" },
    verified: true,
  },
];

const trends = [
  {
    category: "Trending in Technology",
    topic: "#NextJS",
    posts: "23.8K posts",
  },
  { category: "Trending", topic: "#TypeScript", posts: "51.2K posts" },
  { category: "Software Development", topic: "React 19", posts: "12.4K posts" },
];

export default function Homepage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <aside className="sticky top-0 hidden h-screen w-22 shrink-0 border-r border-zinc-200 px-3 py-3 lg:block xl:w-68.75">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-1 ">
            <Link
              href="#"
              className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full  transition hover:bg-zinc-100"
            >
              <Image
                alt="x image"
                src="/image.jpg"
                width={58}
                height={58}
                className="object-contain mx-auto"
              />
            </Link>

            {[
              { icon: Home, label: "Home", active: true },
              { icon: Search, label: "Explore" },
              { icon: Bell, label: "Notifications" },
              { icon: Mail, label: "Messages" },
              { icon: Bookmark, label: "Bookmarks" },
              { icon: Users, label: "Communities" },
              { icon: User, label: "Profile" },
            ].map((item) => (
              <Link
                key={item.label}
                href="#"
                className="group flex items-center gap-4 rounded-full px-3 py-3 transition hover:bg-zinc-100"
              >
                <item.icon className="h-7 w-7" strokeWidth={2.1} />
                <span
                  className={`hidden text-xl xl:inline ${item.active ? "font-bold" : "font-medium"}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            <button className="mt-10 hidden w-full rounded-full bg-black px-8 py-3 text-[15px] font-bold text-white transition hover:bg-zinc-800 xl:block">
              Post
            </button>
          </div>

          <button className="mb-1 flex items-center gap-3 rounded-full px-3 py-3 text-left transition hover:bg-zinc-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-semibold">
              J
            </div>
            <div className="hidden leading-tight xl:block">
              <p className="text-sm font-semibold">Jubril</p>
              <p className="text-sm text-zinc-500">@jubril</p>
            </div>
            <Ellipsis className="ml-auto hidden h-5 w-5 xl:block" />
          </button>
        </div>
      </aside>

      <section className="min-h-screen w-full max-w-150 border-r border-zinc-200">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
          <div className="grid grid-cols-2 text-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`relative py-4 font-semibold transition hover:bg-zinc-100 ${
                  index === 0 ? "text-black" : "text-zinc-500"
                }`}
              >
                {tab}
                {index === 0 && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-sky-500" />
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="border-b border-zinc-200 px-4 py-3">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 font-semibold">
              J
            </div>
            <div className="w-full">
              <input
                className="w-full border-none bg-transparent py-2 text-xl text-zinc-800 placeholder:text-zinc-500 focus:outline-none"
                placeholder="What is happening?!"
              />
              <div className="mt-3 flex items-center justify-between">
                <button className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sky-500 transition hover:bg-sky-50">
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold">Media</span>
                </button>
                <button className="rounded-full bg-black px-4 py-1.5 text-sm font-bold text-white transition hover:bg-zinc-800">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              className="cursor-pointer border-b border-zinc-200 px-4 py-3 transition hover:bg-zinc-50"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-300 font-semibold">
                  {post.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[15px]">
                    <span className="truncate font-bold">{post.name}</span>
                    {post.verified && (
                      <Verified className="h-4 w-4 fill-sky-500 text-white" />
                    )}
                    <span className="truncate text-zinc-500">
                      {post.handle}
                    </span>
                    <span className="text-zinc-500">· {post.time}</span>
                    <Ellipsis className="ml-auto h-5 w-5 text-zinc-500" />
                  </div>
                  <p className="mt-1 text-[15px] leading-6">{post.text}</p>
                  <div className="mt-3 grid grid-cols-4 text-sm text-zinc-500">
                    <span>{post.stats.replies}</span>
                    <span>{post.stats.reposts}</span>
                    <span>{post.stats.likes}</span>
                    <span>{post.stats.views}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

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
    </main>
  );
}
