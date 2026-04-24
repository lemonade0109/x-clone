import ExplorePageSection from "@/components/page/sections/explore-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import { getProfileAction } from "@/lib/actions/profile/get-profile";
import { Verified } from "lucide-react";
import React from "react";

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
  );
};
