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
import ModalStep4 from "./multistep-signup-modal/modal-step-4";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";

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
      const res = await requestSignupCodeAction({ email });
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
      const res = await verifySignupCodeAction({
        email,
        code: verificationCode,
      });
      setLoading(false);

      if (!res?.success) {
        setServerError(res?.error ?? "Invalid verification code.");
        return;
      }

      setStep(3); // password allowed only after successful verify
      return;
    }

    if (step === 3) {
      const ok = await form.trigger(["password"]);
      if (!ok) return;

      setLoading(true);
      const values = form.getValues();
      const res = await signUpAction(values);
      if (!res.sucess) {
        setLoading(false);
        setServerError(res?.error ?? "Signup failed.");
      }

      const login = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setLoading(false);
      if (login?.error) {
        setServerError("Account created. Please sign in.");
        return;
      }

      onOpenChange(false);
      form.reset();
      setStep(1);
      router.push("/home");
      router.refresh();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw] max-w-[600px] rounded-2xl p-0 overflow-hidden">
        <div className="px-8 pt-8 pb-4">
          <Image
            alt="x image"
            src="/image.jpg"
            width={36}
            height={36}
            className="mx-auto"
          />
        </div>

        <div className="px-10 pb-6">
          <DialogTitle className="text-3xl font-bold mb-4">
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

          <div className="mt-6">
            <Button
              onClick={next}
              disabled={loading}
              className="w-full rounded-full py-6"
            >
              {step === 4 ? "Create account" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// "use client";

// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import SignUpForm from "@/components/auth/signup-form";
// import Image from "next/image";

// type Step = 1 | 2 | 3 | 4;

// type SignUpModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// const SignUpModal: React.FC<SignUpModalProps> = ({ open, onOpenChange }) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[94vw]! max-w-180! sm:max-w-180! max-h-[90vh] rounded-2xl p-0 overflow-hidden">
//         <div className="flex h-full max-h-[90vh] flex-col">
//           <div className="shrink-0 px-8 pt-8 pb-4">
//             <Image
//               alt="x image"
//               src="/image.jpg"
//               width={48}
//               height={48}
//               className="object-contain mx-auto"
//             />
//           </div>

//           <div className="min-h-0 overflow-y-auto px-11 pb-8">
//             <DialogTitle className="text-5xl text-center font-bold">
//               Create your account
//             </DialogTitle>
//             <p className="text-center text-muted-foreground my-2">
//               Enter your details to create your X account.
//             </p>
//             <SignUpForm />
//           </div>

//           <div className="w-full max-w-md mx-auto flex flex-col p-4">
//             <Button className="mt-4 rounded-full bg-black py-6 text-lg font-semibold text-white hover:bg-gray-800 hover:text-white">
//               Next
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

export default SignUpModal;
