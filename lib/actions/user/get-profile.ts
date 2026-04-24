"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getProfileAction = async () => {
  const session = await auth();

  const currentUser = session?.user?.email
    ? await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
    : null;

  const user = await db.user.findUnique({
    where: { id: currentUser?.id },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      profileImage: true,
      coverImage: true,
      createdAt: true,
      location: true,
      website: true,
      verified: true,
      onboardingCompleted: true,
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
      followers: currentUser
        ? {
            where: { followerId: currentUser.id },
            select: { followerId: true },
          }
        : false,
    },
  });

  if (!user) return null;

  return {
    ...user,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    postsCount: user._count.posts,
    isFollowing: Array.isArray(user.followers) && user.followers.length > 0,
    isOwner: currentUser?.id === user.id,
    currentUserId: currentUser?.id ?? null,
  };
};
