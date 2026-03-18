import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import BookmarkPageSection from "@/components/page/sections/bookmark-page-section";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import React from "react";

export default function BookmarkPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate userId={"@jubril1234"} />

      <BookmarkPageSection />

      <TrendingSideBar />
    </main>
  );
}
