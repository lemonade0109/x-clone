"use server";

import { db } from "@/db/db";
import { validateUserSession } from "../auth/validate-user-session";
import { getFriendlyErrorMessage } from "@/lib/utils";

export const toggleBookmarkAction = async (postId: string) => {
  try {
    const userValidation = await validateUserSession();
    if (!userValidation?.success) {
      return {
        success: false,
        error: userValidation?.error,
        toast: {
          type: "error",
          message: userValidation?.error,
        },
      };
    }
    const user = userValidation.user;

    const existingBookmark = await db.bookmark.findUnique({
      where: { postId_authorId: { authorId: user?.id ?? "", postId } },
    });
    if (existingBookmark) {
      await db.bookmark.delete({
        where: { postId_authorId: { authorId: user?.id ?? "", postId } },
      });
    } else {
      await db.bookmark.create({
        data: { authorId: user?.id ?? "", postId },
      });
    }
    return { success: true, bookmarked: !existingBookmark };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: getFriendlyErrorMessage(error),
      toast: {
        type: "error",
        message: getFriendlyErrorMessage(error),
      },
    };
  }
};
