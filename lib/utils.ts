import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createHash, randomInt } from "crypto";
import { BsPin } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { ImEmbed2 } from "react-icons/im";
import { SiSimpleanalytics } from "react-icons/si";
import { GiHidden } from "react-icons/gi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helpers
export const CODE_TTL_MINUTES = 10;
export const MAX_ATTEMPTS = 3;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export function generate6DigitCode() {
  return String(randomInt(100000, 1000000));
}

// Render error message from different error shapes
export default function renderError(error: unknown): { message: string } {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
}

// Provide user-friendly error messages based on error types or codes
export function getFriendlyErrorMessage(error: unknown): string {
  console.log(error);
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as Record<string, unknown>).code === "ECONNREFUSED"
  ) {
    return "Unable to connect. Please check your internet connection and try again.";
  }

  // MongoDB/Prisma connection errors
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string" &&
    (((error as Record<string, unknown>).message as string).includes(
      "server selection timeout",
    ) ||
      ((error as Record<string, unknown>).message as string).includes(
        "interrupted due to server monitor timeout",
      ))
  ) {
    return "Unable to connect to the database. Please check your internet connection and try again.";
  }

  // Fallback generic message
  return "Something went wrong. Please try again later.";
}

export const links = [
  { icon: BsPin, label: "Pin to your profile" },
  { href: "/#", label: "Remove from lists", icon: GoChecklist },
  { icon: GoMute, label: "Mute from lists" },
  { icon: IoChatbubbleEllipsesOutline, label: "Change who can reply" },
  { icon: ImEmbed2, label: "Embedded posts" },
  { href: "/#", icon: SiSimpleanalytics, label: "View post analytics" },
  { href: "/#", label: "View hidden replies", icon: GiHidden },
];
