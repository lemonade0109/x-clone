"use server";

import { db } from "@/db/db";
import { getFriendlyErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { validateUserSession } from "../auth/validate-user-session";

export const toggleLikeAction = async (postId: string) => {
  try {
    const userValidate = await validateUserSession();
    if (!userValidate?.success) {
      return {
        success: false,
        error: userValidate?.error,
        toast: {
          type: "error",
          message: userValidate?.error,
        },
      };
    }
    const user = userValidate.user;

    const existingLike = await db.like.findUnique({
      where: {
        postId_authorId: {
          authorId: user?.id ?? "",
          postId,
        },
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { postId_authorId: { postId, authorId: user?.id ?? "" } },
      });
    } else {
      await db.like.create({
        data: {
          authorId: user?.id ?? "",
          postId,
        },
      });
    }
    revalidatePath("/home");
    return { success: true, liked: !existingLike };
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
