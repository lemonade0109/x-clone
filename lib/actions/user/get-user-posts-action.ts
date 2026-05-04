"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getUserPostsAction = async (userId: string, tab: string) => {
  const session = await auth();

  const currentUser = session?.user?.email
    ? await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
    : null;

const where = tab === "media" ? { authorId: userId, NOT: { image: null } } : tab === "likes" ? { likes: { some: { authorId: userId } } } : { authorId: userId };

  const posts = await db.post.findMany({
    where,
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
      likes: currentUser
        ? { where: { authorId: currentUser.id }, select: { id: true } }
        : false,
      reposts: currentUser
        ? { where: { authorId: currentUser.id }, select: { id: true } }
        : false,
      bookmarks: currentUser
        ? { where: { authorId: currentUser.id }, select: { id: true } }
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
};
