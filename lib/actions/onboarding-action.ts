"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export async function completeOnboardingAction(input: {
  username: string;
  image?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const username = input.username.trim().toLowerCase();

  const existing = await db.user.findFirst({
    where: {
      username,
      NOT: { id: session.user.id },
    },
    select: { id: true },
  });

  if (existing) return { error: "Username is already taken." };

  await db.user.update({
    where: { id: session.user.id },
    data: {
      username,
      image: input.image || undefined,
      onboardingCompleted: true,
    },
  });

  return { success: true };
}