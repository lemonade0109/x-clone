"use server";

import { db } from "@/db/db";

export const getPostsAction = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return posts;
};
