import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import SignInForm from "./signin-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignInModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const [step, setStep] = React.useState<1 | 2>(1);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw]! max-w-180! sm:max-w-180! max-h-[90vh] rounded-2xl p-0 overflow-hidden">
        <div className="flex h-full max-h-[90vh] flex-col">
          <div className="shrink-0 px-8  pb-4">
            <Image
              alt="x image"
              src="/image.jpg"
              width={58}
              height={58}
              className="object-contain mx-auto"
            />
          </div>

          <div className="min-h-0 overflow-y-auto px-11 pb-8">
            <DialogTitle className="text-4xl ml-20 font-bold mt-4">
              {step === 1 ? "Sign in to X" : "Enter your password"}
            </DialogTitle>

            <SignInForm onStepChange={setStep} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
