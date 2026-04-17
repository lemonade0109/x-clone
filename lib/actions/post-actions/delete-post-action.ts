"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export const deletePostAction = async (postId: string) => {
  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email)
      return {
        success: false,
        error: "Unauthorized",
      };

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return { success: false, error: "Unauthorized" };

    const post = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) return { success: false, error: "Post not found" };

    if (post.authorId !== user.id)
      return { success: false, error: "Forbidden." };

    await db.post.delete({
      where: { id: postId },
    });

    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: "An error occurred while deleting the post. Please try again.",
    };
  }
};
