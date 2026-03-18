"use server";

import { db } from "@/db/db";
import { hashPassword } from "@/lib/actions/auth/password";
import { getFriendlyErrorMessage, normalizeEmail } from "@/lib/utils";
import { SignUpData } from "@/types";

const isPrismaKnownError = (error: unknown): error is { code: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  );
};

export const signUpAction = async (input: SignUpData) => {
  try {
    const email = normalizeEmail(input.email);

    if (!email) {
      return { success: false, error: "Email is required." };
    }

    const verification = await db.verificationToken.findFirst({
      where: { identifier: email },
      orderBy: { expires: "desc" },
    });

    if (!verification || !verification.verifiedAt) {
      return { success: false, error: "Email is not verified." };
    }

    if (verification.expires.getTime() < Date.now()) {
      return { success: false, error: "Verification expired. Start again." };
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "Email is already in use." };
    }

    const dob = new Date(
      Number(input.dob_year),
      Number(input.dob_month) - 1,
      Number(input.dob_day),
    );

    if (Number.isNaN(dob.getTime())) {
      return { success: false, error: "Invalid date of birth." };
    }

    const hashedPassword = await hashPassword(input.password);

    await db.user.create({
      data: {
        name: input.name.trim(),
        email,
        password: hashedPassword,
        dateOfBirth: dob,
        emailVerified: new Date(),
        username: null,
        image: null,
        onboardingCompleted: false,
      },
    });

    await db.verificationToken.deleteMany({
      where: { identifier: email },
    });

    return { success: true };
  } catch (error) {
    if (isPrismaKnownError(error) && error.code === "P2002") {
      return { success: false, error: "Account already exists." };
    }

    return {
      success: false,
      error:
        getFriendlyErrorMessage(error) || "Signup failed. Please try again.",
    };
  }
};
