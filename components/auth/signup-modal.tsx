"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";

type Step = 1 | 2 | 3 | 4;

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw]! max-w-180! sm:max-w-180! max-h-[90vh] rounded-2xl p-0 overflow-hidden">
        <div className="flex h-full max-h-[90vh] flex-col">
          <div className="shrink-0 px-8 pt-8 pb-4">
            <Image
              alt="x image"
              src="/image.jpg"
              width={48}
              height={48}
              className="object-contain mx-auto"
            />
          </div>

          <div className="min-h-0 overflow-y-auto px-11 pb-8">
            <DialogTitle className="text-5xl text-center font-bold">
              Create your account
            </DialogTitle>
            <p className="text-center text-muted-foreground my-2">
              Enter your details to create your X account.
            </p>
            <SignUpForm />
          </div>

          <div className="w-full max-w-md mx-auto flex flex-col p-4">
            <Button className="mt-4 rounded-full bg-black py-6 text-lg font-semibold text-white hover:bg-gray-800 hover:text-white">
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
