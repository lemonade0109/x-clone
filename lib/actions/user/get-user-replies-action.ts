"use server";

import { db } from "@/db/db";

export const getUserRepliesAction = async (userId: string) => {
  return db.comment.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      createdAt: true,
      postId: true,
      post: {
        select: {
          id: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
};
