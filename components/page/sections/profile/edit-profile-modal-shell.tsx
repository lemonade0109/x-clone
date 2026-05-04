"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

const EditProfileModalShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModalShell;
