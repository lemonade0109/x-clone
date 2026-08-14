"use server";

import { db } from "@/db/db";

export const searchUserAction = async (query: string) => {
  const q = query.trim();

  if (!q) return [];

  return await db.user.findMany({
    where: {
      onboardingCompleted: true,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { username: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      verified: true,
      bio: true,
    },
    take: 5,
  });
};
