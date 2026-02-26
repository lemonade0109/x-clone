import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignInModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw]! max-w-180! sm:max-w-180! rounded-2xl p-8 overflow-hidden">
        <DialogHeader className="space-y-2">
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
