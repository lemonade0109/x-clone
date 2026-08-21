"use server";

import { db } from "@/db/db";
import { TrendingTopic } from "@/types";

const toCategory = (count: number) => {
  if (count >= 20) return "Trending";
  if (count >= 8) return "Popular";
  return "Topic";
};

export const getTrendingTopicsAction = async (): Promise<TrendingTopic[]> => {
  const posts = await db.post.findMany({
    where: {
      content: { contains: "#" },
    },
    select: {
      content: true,
    },
    take: 500,
    orderBy: {
      createdAt: "desc",
    },
  });

  const counts = new Map<string, number>();

  for (const post of posts) {
    const matches = post.content.match(/#([a-zA-Z0-9_]+)/g) ?? [];
    for (const raw of matches) {
      const tag = raw.slice(1).toLowerCase();
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([tag, postCount]) => ({
      tag,
      postCount,
      category: toCategory(postCount),
    }));
};
