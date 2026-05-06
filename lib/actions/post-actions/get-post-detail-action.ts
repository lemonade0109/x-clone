"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getPostDetailAction = async (postId: string, username: string) => {
  const session = await auth();

  const currentUser = session?.user?.email
    ? await db.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: { id: true },
      })
    : null;

  const post = await db.post.findFirst({
    where: {
      id: postId,
      author: { username },
    },
    select: {
      id: true,
      content: true,
      image: true,
      createdAt: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          bio: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true,
          bookmarks: true,
        },
      },
      likes: currentUser
        ? {
            where: {
              authorId: currentUser.id,
            },
            select: { id: true },
          }
        : false,
      bookmarks: currentUser
        ? {
            where: {
              authorId: currentUser.id,
            },
            select: { id: true },
          }
        : false,
      reposts: currentUser
        ? {
            where: {
              authorId: currentUser.id,
            },
            select: { id: true },
          }
        : false,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          authorId: true,
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!post) return null;

  return {
    currentUserId: currentUser?.id || "",
    post: {
      ...post,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
      repostCount: post._count.reposts,
      bookmarkCount: post._count.bookmarks,
      isLiked: Array.isArray(post.likes) && post.likes.length > 0,
      isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
      isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
    },
    comments: post.comments,
  };
};
