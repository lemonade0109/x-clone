"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { uploadImageAction } from "../user/upload-image";
import renderError from "@/lib/utils";
import { PostState } from "@/types";

export const createPostAction = async (
  prevState: PostState,
  formData: FormData,
): Promise<PostState> => {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        error: "You must be signed in.",
      };
    }

    const content = String(formData.get("content") || "").trim();
    const file = formData.get("image") as File | null;
    const directUrl = String(formData.get("imageUrl") || "").trim();
    let image: string | null = directUrl || null;

    // upload file if present
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const dataUri = `data:${file.type || "image/*"};base64,${base64}`;

      const uploaded = await uploadImageAction(dataUri, "posts");
      if (!uploaded?.url) {
        return {
          success: false,
          error: "Failed to upload image.",
          toast: {
            type: "error",
            message: "Failed to upload image.",
          },
        };
      }
      image = uploaded.url;
    }

    if (!content && !image) {
      return {
        success: false,
        error: "Post cannot be empty.",
        toast: {
          type: "error",
          message: "Post cannot be empty.",
        },
      };
    }

    if (content.length > 280) {
      return {
        success: false,
        error: "Post must be 280 characters or less.",
        toast: {
          type: "error",
          message: "Post must be 280 characters or less.",
        },
      };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, image: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found.",
        toast: {
          type: "error",
          message: "User not found.",
        },
      };
    }

    await db.post.create({
      data: {
        content,
        image,
        authorId: user.id,
        profileImage: user.image,
      },
    });

    revalidatePath("/home");
    return {
      success: true,
      message: "Post published.",
      toast: {
        type: "success",
        message: "Post published.",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: renderError({ error: "Failed to create post. Please try again." })
        .message,
      toast: {
        type: "error",
        message: renderError({
          error: "Failed to create post. Please try again.",
        }).message,
      },
    };
  }
};
