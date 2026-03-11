import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import React from "react";

export default function NotificationPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate userId={"@jubril1234"} />{" "}
      <section className="min-h-screen w-full max-w-150 border-r border-zinc-200"></section>
      <TrendingSideBar />
    </main>
  );
}
