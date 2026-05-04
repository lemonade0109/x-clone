"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

const EditProfileModalShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="h-[90vh] !w-[95vw] !max-w-[540px] overflow-y-auto rounded-3xl bg-black p-0 text-white">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModalShell;
