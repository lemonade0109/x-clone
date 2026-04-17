"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getFriendlyErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const toggleRepostAction = async (postId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return { success: false, error: "Unauthorized." };

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) return { success: false, error: "User not found." };

    const existingRepost = await db.repost.findUnique({
      where: { postId_authorId: { authorId: user.id, postId } },
    });

    if (existingRepost) {
      await db.repost.delete({
        where: { postId_authorId: { postId, authorId: user.id } },
      });
    } else {
      await db.repost.create({
        data: {
          authorId: user.id,
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
    };
  }
};
