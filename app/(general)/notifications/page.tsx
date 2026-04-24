import NotificationPageSection from "@/components/page/sections/notifications-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { getProfileAction } from "@/lib/actions/profile/get-profile";
import React from "react";

export default async function NotificationPage() {
  const userData = await getProfileAction();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate
        username={userData?.username ?? ""}
        name={userData?.name ?? ""}
        profileImage={userData?.image ?? ""}
      />

      <NotificationPageSection />

      <TrendingSideBar />
    </main>
  );
}
