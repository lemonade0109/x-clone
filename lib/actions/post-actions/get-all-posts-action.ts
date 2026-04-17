"use server";

import { db } from "@/db/db";

export async function getAllPostsAction({
  currentUserId,
}: {
  currentUserId: string | null;
}) {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      image: true,
      authorId: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      },
      _count: {
        select: {
          likes: true,
          reposts: true,
          comments: true,
          bookmarks: true,
        },
      },
      likes: currentUserId
        ? { where: { authorId: currentUserId }, select: { id: true } }
        : false,
      reposts: currentUserId
        ? { where: { authorId: currentUserId }, select: { id: true } }
        : false,
      bookmarks: currentUserId
        ? { where: { authorId: currentUserId }, select: { id: true } }
        : false,
    },
  });

  return posts.map((post) => ({
    ...post,
    likeCount: post._count.likes,
    repostCount: post._count.reposts,
    commentCount: post._count.comments,
    bookmarkCount: post._count.bookmarks,
    isLiked: Array.isArray(post.likes) && post.likes.length > 0,
    isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
    isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
  }));
}
