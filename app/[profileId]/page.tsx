import ProfilePageSection from "@/components/page/sections/profile/profile-page-section";
import NavLayoutTemplate from "@/components/shared/nav-layout-template";
import TrendingSideBar from "@/components/shared/trending-sidebar";
import { getProfileAction } from "@/lib/actions/user/get-profile";
import { getUserPostsAction } from "@/lib/actions/user/get-user-posts-action";
import { getUserRepliesAction } from "@/lib/actions/user/get-user-replies-action";
import { ProfileTab } from "@/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { username } = await params;
  const { tab } = await searchParams;

  const activeTab: ProfileTab =
    tab === "replies" || tab === "media" || tab === "likes" ? tab : "posts";

  const profile = await getProfileAction();
  if (!profile) notFound();

  const [posts, replies] = await Promise.all([
    activeTab === "replies"
      ? Promise.resolve([])
      : getUserPostsAction(profile.id, activeTab),
    activeTab === "replies"
      ? getUserRepliesAction(profile.id)
      : Promise.resolve([]),
  ]);
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl">
      <NavLayoutTemplate
        username={profile.username ?? ""}
        name={profile.name ?? ""}
        profileImage={profile.image ?? ""}
      />

      <ProfilePageSection
        profile={profile}
        posts={posts}
        replies={replies}
        activeTab={activeTab}
      />

      <Suspense fallback={null}>
        <TrendingSideBar />
      </Suspense>
    </main>
  );
}
