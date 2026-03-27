"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { uploadImageAction } from "../profile/upload-image";
import renderError from "@/lib/utils";

type CreatePostState = {
  success: boolean;
  error?: string;
  message?: string;
  toast?: {
    id?: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
  };
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
    const image = formData.get("image") as File | null;
    console.log(image);
    let imageUrl = null;

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

    try {
      if (image && image.size > 0) {
        const base64 = await image
          .arrayBuffer()
          .then((buffer) => Buffer.from(buffer).toString("base64"));
        const uploadResult = await uploadImageAction(base64, "posts");
        imageUrl = uploadResult?.url || null;
      }
    } catch (error) {
      console.log("Error uploading image", error);
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
        image: imageUrl,
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
