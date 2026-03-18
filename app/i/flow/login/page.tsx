import SignInForm from "@/components/auth/signin-form";
import Image from "next/image";
import React from "react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-[94vw] max-w-180 rounded-2xl border p-8">
        <div className="space-y-2">
          <Image
            alt="x image"
            src="/image.jpg"
            width={48}
            height={48}
            className="object-contain mx-auto"
          />
          <h1 className="text-5xl text-center font-bold">Sign in to X</h1>
        </div>

        <SignInForm />
      </section>
    </main>
  );
}
