import ProfilePageSection from "@/components/page/sections/profile/profile-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { getProfileAction } from "@/lib/actions/user/get-profile";
import { getUserPostsAction } from "@/lib/actions/user/get-user-posts-action";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage() {
  const profile = await getProfileAction();
  if (!profile) notFound();

  const posts = await getUserPostsAction(profile.id);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl bg-white text-black">
      <NavLayoutTemplate
        username={profile.username ?? ""}
        name={profile.name ?? ""}
        profileImage={profile.image ?? ""}
      />

      <ProfilePageSection profile={profile} posts={posts} />

      <Suspense fallback={null}>
        <TrendingSideBar />
      </Suspense>
    </main>
  );
}
