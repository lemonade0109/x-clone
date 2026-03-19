"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

type Props = {
  callbackUrl?: string;
  mode?: "signin" | "signup";
};

export default function OAuthButtons({
  callbackUrl = "/home",
  mode = "signup",
}: Props) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleOAuth(provider: "google" | "apple") {
    try {
      setLoadingProvider(provider);
      await signIn(provider, {
        callbackUrl,
      });
    } finally {
      setLoadingProvider(null);
    }
  }

  const verb = mode === "signup" ? "Sign up" : "Sign in";
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100 text-lg"
        disabled={loadingProvider !== null}
        onClick={() => handleOAuth("google")}
      >
        <span className="inline-flex items-center gap-3">
          <FcGoogle className="size-8" />
          {loadingProvider === "google"
            ? "Connecting..."
            : `${verb} with Google`}
        </span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100 text-lg"
        disabled={loadingProvider !== null}
        onClick={() => handleOAuth("apple")}
      >
        <span className="inline-flex items-center gap-3">
          <FaApple className="size-9 text-black" />
          {loadingProvider === "apple" ? "Connecting..." : `${verb} with Apple`}
        </span>
      </Button>
    </div>
  );
}
