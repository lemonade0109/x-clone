"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getProfileAction = async (profileId?: string) => {
  const session = await auth();

  const currentUser = session?.user?.email
    ? await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
    : null;

  const isObjectId = !!profileId && /^[a-fA-F0-9]{24}$/.test(profileId);

  const user = await db.user.findUnique({
    where: profileId
      ? isObjectId
        ? { id: profileId }
        : { username: profileId }
      : { id: currentUser?.id ?? "" },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      coverImage: true,
      createdAt: true,
      verified: true,
      website: true,
      location: true,
      dateOfBirth: true,
      onboardingCompleted: true,
      followers: currentUser?.id
        ? {
            where: { followerId: currentUser.id },
            select: { id: true },
          }
        : false,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
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
    currentUserImage: user.image ?? null,
  };
};
