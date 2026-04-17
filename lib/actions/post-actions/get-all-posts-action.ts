"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getAllPostsAction = async () => {
  const session = await auth();
  const email = session?.user.email;

  const currentUser = email
    ? await db.user.findUnique({ where: { email }, select: { id: true } })
    : null;

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true,
          bookmarks: true,
        },
      },
      likes: currentUser ? { where: { authorId: currentUser.id } } : false,
      reposts: currentUser ? { where: { authorId: currentUser.id } } : false,
      bookmarks: currentUser ? { where: { authorId: currentUser.id } } : false,
    },
  });

  return posts.map((post) => ({
    ...post,
    likesCount: post._count.likes,
    commentsCount: post._count.comments,
    repostsCount: post._count.reposts,
    bookmarksCount: post._count.bookmarks,
    isLiked: post.likes.length > 0,
    isReposted: post.reposts.length > 0,
    isBookmarked: post.bookmarks.length > 0,
  }));
};

// Without like, comment, repost and bookmark
// export const getAllPostsAction = async () => {
//   const posts = await db.post.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       author: true,
//     },
//   });

//   return posts;
// };
