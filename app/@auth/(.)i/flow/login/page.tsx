"use client";

import SignInModal from "@/components/auth/signin-modal";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <SignInModal
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    />
  );
}
