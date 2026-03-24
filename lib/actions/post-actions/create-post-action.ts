"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

type CreatePostState = {
  success: boolean;
  error?: string;
};

export const createPostAction = async (
  prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> => {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        error: "You must be signed in.",
      };
    }

    const content = String(formData.get("content") || "").trim();

    const image = String(formData.get("image") || "").trim() || null;

    if (!content && !image) {
      return {
        success: false,
        error: "Post cannot be empty.",
      };
    }

    if (content.length > 280) {
      return {
        success: false,
        error: "Post must be 280 characters or less.",
      };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    await db.post.create({
      data: {
        content,
        image,
        authorId: user.id,
      },
    });

    revalidatePath("/home");
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to create post. Please try again.",
    };
  }
};
