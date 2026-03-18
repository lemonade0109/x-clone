import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";

export default function SignUpPage() {
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
          <h1 className="text-5xl text-center font-bold">
            Create your account
          </h1>
          <p className="text-center text-muted-foreground">
            Enter your details to create your X account.
          </p>
        </div>

        <SignUpForm />
      </section>
    </main>
  );
}
