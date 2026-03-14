"use client";

import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboardingAction } from "@/lib/actions/onboarding-action";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  initialImage?: string | null;
  initialUsername?: string | null;
};

const OnboardingModal: React.FC<Props> = ({
  open,
  initialImage,
  initialUsername,
}) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [image, setImage] = useState(initialImage ?? "");
  const [username, setUsername] = useState(initialUsername ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onNext() {
    setError("");

    if (step === 1) {
      // If using real upload service, upload file first and set returned URL here.
      setStep(2);
      return;
    }

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    setLoading(true);
    const res = await completeOnboardingAction({
      username,
      image: image || undefined,
    });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.refresh();
  }

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-bold">
            {step === 1 ? "Pick a profile picture" : "Choose a username"}
          </DialogTitle>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {step === 1 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Upload your profile photo.
              </p>
              <Input
                placeholder="Image URL (or wire your upload widget)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This will be your @handle.
              </p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  @
                </span>
                <Input
                  className="pl-7"
                  placeholder="username"
                  maxLength={20}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <Button
            onClick={onNext}
            disabled={loading}
            className="w-full rounded-full"
          >
            {step === 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
