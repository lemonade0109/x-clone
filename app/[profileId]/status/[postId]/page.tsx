import PostDetailSection from "@/components/homepage/post/post-detail-section";
import { getPostDetailAction } from "@/lib/actions/post-actions/get-post-detail-action";
import { notFound } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ profileId: string; postId: string }>;
}) {
  const { profileId, postId } = await params;

  const data = await getPostDetailAction(postId, profileId);

  if (!data) {
    notFound();
  }

  return (
    <PostDetailSection
      post={data.post}
      comments={data.comments}
      commentsCount={data.post.commentCount}
      currentUserId={data.currentUserId}
    />
  );
}
