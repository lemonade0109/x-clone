"use client";

import SignUpModal from "@/components/auth/signup-modal";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <SignUpModal
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    />
  );
}
