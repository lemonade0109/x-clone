"use server";

import { getFriendlyErrorMessage } from "@/lib/utils";
import { validateUserSession } from "../auth/validate-user-session";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export const createCommentAction = async (
  postId: string,
  content: string,
  mediaUrl?: string | null,
) => {
  try {
    const trimmedContent = content.trim();
    const normalizedMediaUrl = mediaUrl?.trim();

    if (!trimmedContent && !normalizedMediaUrl) {
      return {
        success: false,
        error: "Reply cannot be empty.",
        toast: {
          type: "error",
          message: "Reply cannot be empty.",
        },
      };
    }

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

    await db.comment.create({
      data: {
        authorId: user?.id ?? "",
        postId,
        content: trimmedContent,
        image: normalizedMediaUrl || null,
      },
    });
    revalidatePath("/home");
    return { success: true };
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
