import SignInForm from "@/components/auth/signin-form";
import { Suspense } from "react";
import { FaXTwitter } from "react-icons/fa6";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-[94vw] max-w-180 rounded-2xl border p-8">
        <div className="space-y-2">
          <FaXTwitter size={38} className="mx-auto" />
          <h1 className="text-5xl text-center font-bold">Sign in to X</h1>
        </div>

        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </section>
    </main>
  );
}
