"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/^@+/, "");
}

export const completeOnboardingAction = async (input: {
  username: string;
  image?: string | null;
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized." };
  }

  const username = normalizeUsername(input.username);

  if (!/^[a-z0-9_]{4,15}$/.test(username)) {
    return {
      success: false,
      error: "Username must be 4-15 characters and use only letters, numbers, or underscores.",
    };
  }

  const existingUsername = await db.user.findFirst({
    where: {
      username,
      NOT: { id: session.user.id },
    },
    select: { id: true },
  });

  if (existingUsername) {
    return { success: false, error: "Username is already taken." };
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      username,
      image: input.image ?? null,
      onboardingCompleted: true,
    },
  });

  return { success: true };
};
