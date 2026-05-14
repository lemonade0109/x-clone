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
    <div className="mx-auto mt-4 flex w-full flex-col gap-4 px-15 py-4 text-zinc-900 dark:text-zinc-100">
      {step === 1 ? (
        <OAuthButtons callbackUrl={redirectAfterLogin} mode="signin" />
      ) : null}

      {step === 1 ? (
        <div className="my-3 flex items-center">
          <div className="flex-1 border border-zinc-300 dark:border-zinc-700" />
          <span className="mx-2 text-lg text-zinc-500 dark:text-zinc-400">
            OR
          </span>
          <div className="flex-1 border border-zinc-300 dark:border-zinc-700" />
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
          className="read-only:bg-zinc-100 read-only:text-zinc-500 dark:read-only:bg-zinc-900 dark:read-only:text-zinc-400"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <Button
              type="button"
              variant="link"
              className="absolute right-0 top-full text-sm font-normal text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password(todo)?
            </Button>
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        ) : null}

        <div className="mt-20 flex flex-col gap-2">
          <Button
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            className="rounded-full bg-black py-6 text-lg font-semibold text-white hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {pending ? "Please wait..." : step === 1 ? "Next" : "Log in"}
          </Button>
        </div>
      </form>

      <p className="mt-0 text-start text-md text-zinc-600 dark:text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/i/flow/signup"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
