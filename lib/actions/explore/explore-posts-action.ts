import { db } from "@/db/db";
import { PostItem } from "@/types";

export const getExplorePostsAction = async (
  query: string,
  currentUserId?: string | null,
): Promise<PostItem[]> => {
  const cleanQuery = query.trim().replace(/^#/, "");

  if (!cleanQuery) return [];

  const posts = await db.post.findMany({
    where: {
      content: {
        contains: cleanQuery,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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
    isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
  }));
};
