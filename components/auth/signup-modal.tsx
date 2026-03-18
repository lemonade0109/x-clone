"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { fullSignUpSchema } from "@/lib/validators";
import { Step, SignUpData } from "@/types";
import ModalStep1 from "./multistep-signup-modal/modal-step-1";
import ModalStep2Verification from "./multistep-signup-modal/modal-step-2";
import ModalStep3 from "./multistep-signup-modal/modal-step-3";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { requestCodeAction } from "@/lib/actions/auth/signup-actions/request-code-action";
import { verifyRequestCodeAction } from "@/lib/actions/auth/signup-actions/verify-request-code";
import { signUpAction } from "@/lib/actions/auth/signup-actions/signup-action";

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onOpenChange }) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignUpData>({
    resolver: zodResolver(fullSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      dob_month: "",
      dob_day: "",
      dob_year: "",
      verification_code: "",
      password: "",
      username: "",
    },
  });

  const next = async () => {
    setServerError(null);

    if (step === 1) {
      const ok = await form.trigger([
        "name",
        "email",
        "dob_month",
        "dob_day",
        "dob_year",
      ]);
      if (!ok) return;

      setLoading(true);
      const email = form.getValues("email");
      const res = await requestCodeAction({ email });
      setLoading(false);

      if (!res?.success) {
        setServerError(res?.error ?? "Could not send verification code.");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      const ok = await form.trigger(["verification_code"]);
      if (!ok) return;

      setLoading(true);
      const email = form.getValues("email");
      const verificationCode = form.getValues("verification_code");
      const res = await verifyRequestCodeAction({
        email,
        code: verificationCode,
      });
      setLoading(false);

      if (!res?.success) {
        setServerError(res?.error ?? "Invalid verification code.");
        return;
      }

      setStep(3);
      return;
    }

    if (step === 3) {
      const ok = await form.trigger(["password"]);
      if (!ok) return;

      setLoading(true);
      setServerError(null);

      const values = form.getValues();
      const res = await signUpAction(values);
      console.log("signUpAction result:", res);

      if (!res?.success) {
        setLoading(false);
        setServerError(res?.error ?? "Signup failed.");
        return;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/home",
      });

      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw]! max-w-180 sm:max-w-180! max-h-[90vh] rounded-2xl px-4 overflow-hidden">
        <div className="flex h-full max-h-[90vh] flex-col">
          <div className="shrink-0 px-8 pt-4 pb-4">
            <Image
              alt="x image"
              src="/image.jpg"
              width={48}
              height={48}
              className="object-contain mx-auto"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-11 pb-8">
            <DialogTitle className="text-5xl text-start font-semibold mb-4">
              {step === 1 && "Create your account"}
              {step === 2 && "We sent you a code"}
              {step === 3 && "You'll need a password"}
            </DialogTitle>

            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {step === 1 && <ModalStep1 form={form} />}
                {step === 2 && (
                  <ModalStep2Verification
                    form={form}
                    email={form.getValues("email")}
                  />
                )}
                {step === 3 && <ModalStep3 form={form} />}

                {serverError ? (
                  <p className="text-sm text-red-500">{serverError}</p>
                ) : null}
              </form>
            </Form>
          </div>

          <div className="shrink-0 w-full max-w-lg mx-auto flex flex-col mb-8 p-5">
            <Button
              onClick={next}
              disabled={loading}
              className="w-full rounded-full py-8 text-[15px] font-bold bg-black text-white hover:bg-gray-800 disabled:opacity-70"
            >
              {step === 3 ? "Create account" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
