"use server";

import { db } from "@/db/db";
import { sendSignupCodeEmail } from "@/lib/mail/templates/send-signup-code-email";
import {
  CODE_TTL_MINUTES,
  generate6DigitCode,
  hashCode,
  normalizeEmail,
  renderError,
} from "@/lib/utils";

export const requestCodeAction = async (input: { email: string }) => {
  try {
    const email = normalizeEmail(input.email);
    if (!email) return { success: false, error: "Email is required." };

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser)
      return { success: false, error: "Email is already in use." };

    const code = generate6DigitCode();
    const codeHash = hashCode(code);
    const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

    await db.verificationToken.deleteMany({
      where: { identifier: email },
    });

    await db.verificationToken.create({
      data: {
        identifier: email,
        token: codeHash,
        expires: expiresAt,
        attempts: 0,
        verifiedAt: null,
      },
    });

    await sendSignupCodeEmail(email, code);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: renderError(error).message || "Request failed.",
    };
  }
};
