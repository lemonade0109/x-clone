import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "./search-bar";
import { CgSpinner } from "react-icons/cg";
import WhoToFollowList from "./who-to-follow-list";
import WhoToFollowSkeleton from "./who-to-follow-skeleton";

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
  return (
    <aside className="sticky top-0 hidden h-screen min-w-[320px] flex-col px-4 py-2 lg:flex">
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
        {/* Search bar */}
        <div className="sticky top-0 bg-white dark:bg-black py-2 z-10 px-2">
          <SearchBar />
        </div>

        {/* Trends for you */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Suspense
            fallback={
              <CgSpinner
                className="mx-auto mt-5 animate-spin text-xl text-sky-500"
                size={24}
              />
            }
          >
            <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold">
              Trends for you
            </h2>
            {trends.map((trend) => (
              <Link
                key={trend.topic}
                href={`/explore?q=${encodeURIComponent(trend.topic)}`}
                className="flex w-full items-start justify-between px-4 py-3 text-left transition hover:bg-zinc-200 dark:hover:bg-zinc-800/30"
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
              className="block rounded-b-2xl px-4 py-3 text-sm text-sky-500 transition hover:bg-zinc-200 dark:hover:bg-zinc-800/30"
            >
              Show more
            </Link>
          </Suspense>
        </section>

        {/* Who to follow */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 ">
          <Suspense
            fallback={
              <CgSpinner
                className="mx-auto my-5 animate-spin text-xl text-sky-500"
                size={24}
              />
            }
          >
            <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold">
              Who to follow
            </h2>

            <Suspense fallback={<WhoToFollowSkeleton />}>
              <WhoToFollowList />
            </Suspense>

            <Link
              href="/#"
              className="block rounded-b-2xl px-4 py-3 text-sm text-sky-500 transition hover:bg-zinc-200 dark:hover:bg-zinc-800/30"
            >
              Show more
            </Link>
          </Suspense>
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
