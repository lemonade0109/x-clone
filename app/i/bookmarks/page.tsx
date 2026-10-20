import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import BookmarkPageSection from "@/components/page/sections/bookmark-page-section";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import React from "react";
import { getProfileAction } from "@/lib/actions/user/get-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks / X",
};

export default async function BookmarkPage() {
  const userData = await getProfileAction();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl">
      <NavLayoutTemplate
        username={userData?.username ?? ""}
        name={userData?.name ?? ""}
        profileImage={userData?.image ?? ""}
      />

      <BookmarkPageSection />

      <TrendingSideBar />
    </main>
  );
}
