"use server";

import { getFriendlyErrorMessage } from "@/lib/utils";
import { validateUserSession } from "../auth/validate-user-session";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export const createCommentAction = async (postId: string, content: string) => {
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

    await db.comment.create({
      data: {
        authorId: user?.id ?? "",
        postId,
        content,
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
