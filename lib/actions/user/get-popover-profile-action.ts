"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getPopoverProfileAction = async (userId: string) => {
  const session = await auth();

  const currentUser = session?.user?.email
    ? await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
    : null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      verified: true,
      _count: { select: { followers: true, following: true } },
      followers: currentUser
        ? { where: { followerId: currentUser.id }, select: { followerId: true } }
        : false,
    },
  });

  if (!user) return null;

  const isOwner = currentUser?.id === user.id;
  const isFollowing =
    Array.isArray(user.followers) && user.followers.length > 0;

  let mutuals: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  }[] = [];
  let mutualsCount = 0;

  if (currentUser && !isOwner) {
    const myFollowing = await db.follow.findMany({
      where: { followerId: currentUser.id },
      select: { followingId: true },
    });

    const myFollowingIds = myFollowing.map((f) => f.followingId);

    if (myFollowingIds.length > 0) {
      const mutualsData = await db.follow.findMany({
        where: { followingId: user.id, followerId: { in: myFollowingIds } },
        take: 3,
        select: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      });

      mutuals = mutualsData.map((m) => m.follower);
      mutualsCount = await db.follow.count({
        where: { followingId: user.id, followerId: { in: myFollowingIds } },
      });
    }
  }

  return {
    id: user.id,
    name: user.name,
    image: user.image,
    username: user.username,
    bio: user.bio,
    verified: user.verified,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    isFollowing,
    isOwner,
    isAuthenticated: !!currentUser,
    mutuals,
    mutualsCount,
  };
};
