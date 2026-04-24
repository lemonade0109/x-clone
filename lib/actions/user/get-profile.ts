"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getProfileAction = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
    },
  });
};
