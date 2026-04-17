"use server";

import { db } from "@/db/db";
import { getFriendlyErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { validateUserSession } from "../auth/validate-user-session";

export const toggleRepostAction = async (postId: string) => {
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

    const existingRepost = await db.repost.findUnique({
      where: { postId_authorId: { authorId: user?.id ?? "", postId } },
    });

    if (existingRepost) {
      await db.repost.delete({
        where: { postId_authorId: { postId, authorId: user?.id ?? "" } },
      });
    } else {
      await db.repost.create({
        data: {
          authorId: user?.id ?? "",
          postId,
        },
      });
    }

    revalidatePath("/home");
    return { success: true, reposted: !existingRepost };
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
