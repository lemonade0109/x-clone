"use server";

import { db } from "@/db/db";
import { validateUserSession } from "../auth/validate-user-session";
import { revalidatePath } from "next/cache";

type Input = {
  name: string;
  username: string;
  bio?: string;
  website?: string;
  location?: string;
  image?: string;
  coverImage?: string;
};

export const updateProfileAction = async (input: Input) => {
  try {
    const userValid = await validateUserSession();

    if (!userValid || !userValid.user) {
      return {
        success: false,
        error: "Unauthorized",
        message: "You must be logged in to update your profile.",
        toast: {
          type: "error",
          message: "Unauthorized. Please log in to update your profile.",
        },
      };
    }

    const userEmail = userValid.user.email;
    if (!userEmail) {
      return {
        success: false,
        error: "Unauthorized",
        message: "User email not found in session.",
        toast: {
          type: "error",
          message: "Unauthorized. User email not found in session.",
        },
      };
    }

    const currentUser = await db.user.findUnique({
      where: { email: userEmail },
      select: { id: true, username: true },
    });

    if (!currentUser) {
      return {
        success: false,
        error: "User not found",
        message: "The user associated with this session was not found.",
        toast: {
          type: "error",
          message: "User not found. Please log in again.",
        },
      };
    }

    const username = input.username.trim().toLowerCase();
    const name = input.name.trim();

    if (!name) {
      return {
        success: false,
        error: "Validation error",
        message: "Name is required.",
        toast: {
          type: "error",
          message: "Name is required.",
        },
      };
    }

    if (!username) {
      return {
        success: false,
        error: "Validation error",
        message: "Username is required.",
        toast: {
          type: "error",
          message: "Username is required.",
        },
      };
    }

    const taken = await db.user.findFirst({
      where: {
        username,
        NOT: { id: currentUser.id },
      },
      select: { id: true },
    });

    if (taken) {
      return {
        success: false,
        error: "Validation error",
        message: "Username is already taken.",
        toast: {
          type: "error",
          message: "Username is already taken. Please choose another.",
        },
      };
    }

    await db.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        username,
        bio: input.bio?.trim() ?? null,
        website: input.website?.trim() ?? null,
        location: input.location?.trim() ?? null,
        image: input.image?.trim() ?? null,
        coverImage: input.coverImage?.trim() ?? null,
      },
    });

    if (currentUser.username) revalidatePath(`/${currentUser.username}`);
    revalidatePath(`${username}`);

    return {
      success: true,
      username,
      message: "Profile updated successfully.",
      toast: {
        type: "success",
        message: "Profile updated successfully.",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Update failed",
      message: "Something went wrong while updating the profile.",
      toast: {
        type: "error",
        message: "Something went wrong while updating the profile.",
      },
    };
  }
};
