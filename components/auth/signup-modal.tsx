"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw]! max-w-180! sm:max-w-180! rounded-2xl p-8 overflow-hidden">
        <Image
          alt="x image"
          src="/image.jpg"
          width={48}
          height={48}
          className="object-contain mx-auto"
        />
        <DialogTitle className="text-5xl text-center font-bold">
          Create your account
        </DialogTitle>
        <p className="text-center text-muted-foreground">
          Enter your details to create your X account.
        </p>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
