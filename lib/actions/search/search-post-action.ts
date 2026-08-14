"use server";

import { db } from "@/db/db";

export const searchPostAction = async (query: string) => {
  const q = query.trim();

  if (!q) return [];

  return await db.post.findMany({
    where: {
      content: {
        contains: q,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      content: true,
      image: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
};
