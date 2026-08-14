"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getSuggestedUsersAction = async () => {
  const session = await auth();

  if (!session?.user.email) return [];

  const currentUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!currentUser) return [];

  const followed = await db.follow.findMany({
    where: { followerId: currentUser.id },
    select: { followingId: true },
  });

  const followedIds = followed.map((f) => f.followingId);

  return await db.user.findMany({
    where: {
      AND: [
        { id: { not: currentUser.id } },
        ...(followedIds.length > 0 ? [{ id: { notIn: followedIds } }] : []),
        { onboardingComplete: true },
      ],
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      verified: true,
    },
    take: 5,
  });
};
