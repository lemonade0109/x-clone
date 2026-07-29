"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const getCurrentUserAction = async () => {
  const session = await auth();
  if (!session?.user?.email) return null;

  return db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      onboardingCompleted: true,
      email: true,
    },
  });
};
