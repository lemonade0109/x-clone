"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export async function validateUserSession() {
  const session = await auth();
  if (!session?.user.email) return { success: false, error: "Unauthorized" };

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return { success: false, error: "User not found" };
  return { success: true, user };
}
