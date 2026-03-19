"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import OAuthButtons from "./oauth-buttons";
import { signInUserAction } from "@/lib/actions/auth/signin-action/signin-action";
import FloatingInputLabel from "../shared/floating-input-label";
import { Eye, EyeOff } from "lucide-react";

type SignInFormProps = {
  onStepChange?: (step: 1 | 2) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ onStepChange }) => {
  const searchParams = useSearchParams();
  const redirectAfterLogin =
    searchParams.get("redirect_after_login") || "/home";

  const [step, setStep] = React.useState<1 | 2>(1);
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [pending, startTransition] = React.useTransition();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const submitStepOne = () => {
    if (!identifier.trim()) {
      setError("Enter your phone, email, or username.");
      return;
    }
    setError("");
    setStep(2);
  };

  const submitStepTwo = () => {
    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }

    setError("");

    startTransition(async () => {
      const res = await signInUserAction({
        email: identifier.trim(),
        password,
        redirectAfterLogin,
      });

      if (!res?.success) {
        setError(res?.error ?? "Unable to sign in.");
      }
    });
  };

  const identifierText = identifier.trim();
  const passwordText = password.trim();

  const canSubmit =
    !pending &&
    (step === 1 ? identifierText.length > 0 : passwordText.length > 0);

  return (
    <div className="mx-auto mt-4 flex w-full px-15 flex-col gap-4 py-4">
      {step === 1 ? (
        <OAuthButtons callbackUrl={redirectAfterLogin} mode="signin" />
      ) : null}

      {step === 1 ? (
        <div className="flex my-3 items-center">
          <div className="flex-1 border border-gray-100" />
          <span className="mx-2 text-lg">OR</span>
          <div className="flex-1 border border-gray-100" />
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) {
            submitStepOne();
            return;
          }
          submitStepTwo();
        }}
        className="flex flex-col gap-4"
      >
        <FloatingInputLabel
          type="text"
          label="Phone, email, or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          readOnly={step === 2}
          disabled={step === 2}
          aria-disabled={step === 2}
          className="read-only:bg-zinc-50 read-only:text-gray-500"
          autoComplete="username"
          required
        />

        {step === 2 ? (
          <div className="relative">
            <FloatingInputLabel
              type={show ? "text" : "password"}
              label="Password"
              className="pr-10"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <Button
              type="button"
              variant="link"
              className="text-sm font-normal absolute right-0 top-full text-blue-500 hover:underline"
            >
              Forgot password(todo)?
            </Button>
          </div>
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="mt-20 flex flex-col gap-2">
          <Button
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            className="rounded-full bg-black py-6 text-lg font-semibold text-white hover:bg-gray-800 hover:text-white disabled:pointer-events-none disabled:opacity-60"
          >
            {pending ? "Please wait..." : step === 1 ? "Next" : "Log in"}
          </Button>
        </div>
      </form>

      <p className="mt-0 text-start text-md text-gray-500">
        Don't have an account?{" "}
        <Link href="/i/flow/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
