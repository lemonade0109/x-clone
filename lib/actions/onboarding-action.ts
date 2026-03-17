"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/^@+/, "");
}

export const checkUsernameAvailabilityAction = async (rawUsername: string) => {
  const session = await auth();
  if (!session?.user.email) {
    return { available: false, error: "Unauthorized." };
  }

  const username = normalizeUsername(rawUsername);

  if (!/^[a-z0-9_]{4,15}$/.test(username)) {
    return {
      available: false,
    };
  }

  const existingUser = await db.user.findFirst({
    where: { username, NOT: { id: session.user.id } },
    select: { id: true },
  });

  return { available: !existingUser };
};

export const completeOnboardingAction = async (input: {
  username: string;
  image?: string | null;
}) => {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized." };
  }

  const username = normalizeUsername(input.username);

  if (!/^[a-z0-9_]{4,15}$/.test(username)) {
    return {
      success: false,
      error:
        "Username must be 4-15 characters and use only letters, numbers, or underscores.",
    };
  }

  const currentUser =
    (session.user.id
      ? await db.user.findUnique({
          where: { id: session.user.id },
          select: { id: true },
        })
      : null) ??
    (await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    }));

  if (!currentUser) {
    return { success: false, error: "User not found." };
  }

  const existingUsername = await db.user.findFirst({
    where: {
      username,
      NOT: { id: currentUser.id },
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

  revalidatePath("/home");

  return { success: true };
};
