"use server";

import { signIn } from "@/auth";
import { normalizeEmail } from "@/lib/utils";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type SignInInput = {
  email: string;
  password: string;
  redirectAfterLogin?: string;
};

function toSafeRedirect(path?: string) {
  if (!path) return "/home";
  if (!path.startsWith("/") || path.startsWith("//")) return "/home";
  return path;
}

export const signInUserAction = async (input: SignInInput) => {
  try {
    const email = normalizeEmail(input.email);
    const password = input.password?.trim() ?? "";
    const redirectTo = toSafeRedirect(input.redirectAfterLogin);

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo,
    });

    return { success: true, error: null };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, error: "Invalid email or password." };
      }

      return { success: false, error: "Unable to sign in. Please try again." };
    }

    return { success: false, error: "Something went wrong. Please try again." };
  }
};
