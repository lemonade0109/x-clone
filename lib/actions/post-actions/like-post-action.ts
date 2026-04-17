"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getFriendlyErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { lightningCssTransform } from "next/dist/build/swc/generated-native";

export const toggleLikeAction = async (postId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return { success: false, error: "Unauthorized." };

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) return { success: false, error: "User not found." };

    const existingLike = await db.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { postId_authorId: { postId, authorId: user.id } },
      });
    } else {
      await db.like.create({
        data: {
          authorId: user.id,
          postId,
        },
      });
    }
    revalidatePath("/home");
    return { success: true, liked: !existingLike };
  } catch (error) {
    return {
      success: false,
      error: getFriendlyErrorMessage(error),
    };
  }
};
