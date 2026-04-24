"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getSuggestedUsersAction = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return await db.user.findMany({
    where: {
      id: { not: userId ?? "" },
      onboardingCompleted: true,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      verified: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
};
