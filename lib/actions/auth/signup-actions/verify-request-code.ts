"use server";

import { db } from "@/db/db";
import renderError, {
  hashCode,
  MAX_ATTEMPTS,
  normalizeEmail,
} from "@/lib/utils";

export const verifyRequestCodeAction = async (input: {
  email: string;
  code: string;
}) => {
  try {
    const email = normalizeEmail(input.email);
    const code = input.code.trim();

    if (!email || !/^\d{6}$/.test(code)) {
      return { success: false, error: "Invalid verification code." };
    }

    const record = await db.verificationToken.findFirst({
      where: { identifier: email },
      orderBy: { expires: "desc" },
    });

    if (!record) {
      return { success: false, error: "No verification request found." };
    }

    if (record.verifiedAt) {
      return { success: true };
    }

    if (record.expires.getTime() < Date.now()) {
      return { success: false, error: "Code expired. Request a new one." };
    }

    if ((record.attempts ?? 0) >= MAX_ATTEMPTS) {
      return {
        success: false,
        error: "Too many attempts. Request a new code.",
      };
    }

    const isValid = record.token === hashCode(code);

    if (!isValid) {
      await db.verificationToken.update({
        where: { token: record.token },
        data: {
          attempts: { increment: 1 },
        },
      });

      return { success: false, error: "Incorrect verification code." };
    }

    await db.verificationToken.update({
      where: { token: record.token },
      data: {
        verifiedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: renderError(error).message || "Verification failed.",
    };
  }
};
