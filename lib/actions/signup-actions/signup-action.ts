"use server";

import { db } from "@/db/db";
import { hashPassword } from "@/lib/auth/password";
import { normalizeEmail, renderError } from "@/lib/utils";
import { SignUpData } from "@/types";

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
      },
    });

    await db.verificationToken.deleteMany({
      where: { identifier: email },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: renderError(error).message || "Signup failed. Please try again.",
    };
  }
};
