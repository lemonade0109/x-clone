import ExplorePageSection from "@/components/page/sections/explore/explore-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import { Suspense } from "react";
import WhoToFollowList from "@/components/shared/who-to-follow-list";
import WhoToFollowSkeleton from "@/components/shared/who-to-follow-skeleton";
import { getCurrentUserAction } from "@/lib/actions/user/get-current-user-action";
import Link from "next/link";
import ExploreTrendingTopics from "@/components/shared/explore-trending-topics";
import ExploreTrendingTopicsSkeleton from "@/components/shared/explore-trending-topics-skeleton";

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

export default async function ExplorePage() {
  const user = await getCurrentUserAction();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl ">
      <NavLayoutTemplate
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        username={user?.username ?? ""}
        profileImage={user?.image ?? null}
      />

      <ExplorePageSection />

      <ExplorePageSideBar />
    </main>
  );
}

const ExplorePageSideBar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen min-w-82.5 flex-1 px-8 py-2 lg:block">
      <div className="sticky top-2 space-y-4">
        <div className="my-4 border border-zinc-200 dark:border-zinc-800" />

        <Suspense fallback={<ExploreTrendingTopicsSkeleton />}>
          <ExploreTrendingTopics />
        </Suspense>

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="px-4 pb-1 pt-3 text-xl font-extrabold">
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
        </section>
      </div>
    </aside>
  );
};
