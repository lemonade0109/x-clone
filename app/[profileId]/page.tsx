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
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
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
    <ProfilePageSection
      profile={profile}
      posts={posts}
      replies={replies}
      activeTab={activeTab}
    />
  );
}
