import ExplorePageSection from "@/components/page/sections/explore-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import { getProfileAction } from "@/lib/actions/user/get-profile";
import { Suspense } from "react";
import WhoToFollowList from "@/components/shared/who-to-follow-list";
import WhoToFollowSkeleton from "@/components/shared/who-to-follow-skeleton";

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
  const userData = await getProfileAction();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate
        username={userData?.username ?? ""}
        name={userData?.name ?? ""}
        profileImage={userData?.image ?? ""}
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

          <Suspense fallback={<WhoToFollowSkeleton />}>
            <WhoToFollowList />
          </Suspense>
        </section>
      </div>
    </aside>
  );
};
