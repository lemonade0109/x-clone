import PostDetailSection from "@/components/homepage/post/post-detail-section";
import { getPostDetailAction } from "@/lib/actions/post-actions/get-post-detail-action";
import { notFound } from "next/navigation";
import React from "react";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) {
  const { username, postId } = await params;

  const data = await getPostDetailAction(postId, username);

  if (!data) {
    notFound();
  }

  return (
    <PostDetailSection
      post={data.post}
      comments={data.comments}
      currentUserId={data.currentUserId}
    />
  );
}
