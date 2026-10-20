"use server";

import { db } from "@/db/db";
import { getCurrentUserAction } from "../user/get-current-user-action";
import { revalidatePath } from "next/cache";
import type { PostItem } from "@/types";

export async function getBookmarkedPostsAction(): Promise<PostItem[]> {
  const currentUser = await getCurrentUserAction();

  if (!currentUser?.id) {
    return [];
  }

  // Fetch bookmarks belonging to the user and include the post details
  const bookmarks = await db.bookmark.findMany({
    where: {
      authorId: currentUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
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
          likes: {
            where: { authorId: currentUser.id },
            select: { id: true },
          },
          reposts: {
            where: { authorId: currentUser.id },
            select: { id: true },
          },
          bookmarks: {
            where: { authorId: currentUser.id },
            select: { id: true },
          },
        },
      },
    },
  });

  // Extract and return formatted PostItem objects
  return bookmarks
    .map((bookmark) => bookmark.post)
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map((post) => ({
      id: post.id,
      content: post.content,
      image: post.image,
      authorId: post.authorId,
      createdAt: post.createdAt,
      author: post.author,
      likeCount: post._count.likes,
      repostCount: post._count.reposts,
      commentCount: post._count.comments,
      bookmarkCount: post._count.bookmarks,
      isLiked: Array.isArray(post.likes) && post.likes.length > 0,
      isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
      isBookmarked: true,
    }));
}

export async function clearAllBookmarksAction() {
  const currentUser = await getCurrentUserAction();

  if (!currentUser?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.bookmark.deleteMany({
      where: {
        authorId: currentUser.id,
      },
    });

    revalidatePath("/i/bookmarks");
    return { success: true };
  } catch (error) {
    console.error("Failed to clear bookmarks:", error);
    return { success: false, error: "Failed to clear bookmarks" };
  }
}
