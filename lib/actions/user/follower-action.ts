"use server";

import { getFriendlyErrorMessage } from "@/lib/utils";
import { validateUserSession } from "../auth/validate-user-session";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export const toggleFollowAction = async (targetUserId: string) => {
  try {
    const session = await validateUserSession();
    if (!session.success) {
      return { success: false, error: session.error };
    }

    const { user: currentUser } = session;
    if (!currentUser || currentUser.id === targetUserId) {
      return { success: false, error: "You cannot follow yourself" };
    }

    const existingFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      await db.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: targetUserId,
          },
        },
      });
    } else {
      await db.follow.create({
        data: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      });
    }

    revalidatePath(`/${targetUserId}`, "page");
    return { success: true, followed: !existingFollow };
  } catch (error) {
    return {
      success: false,
      error: getFriendlyErrorMessage(error),
    };
  }
};
