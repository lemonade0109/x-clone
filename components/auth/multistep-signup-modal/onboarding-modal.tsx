"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInputLabel from "@/components/shared/floating-input-label";
import { completeOnboardingAction } from "@/lib/actions/onboarding-action";

type Props = {
  open: boolean;
  initialImage?: string | null;
  initialUsername?: string | null;
};

const CameraIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5.5 w-5.5 fill-white"
  >
    <path d="M9.5 5.25c.3-.37.75-.58 1.22-.58h2.56c.47 0 .92.21 1.22.58l1.02 1.25h1.73A2.75 2.75 0 0 1 20 9.25v7A2.75 2.75 0 0 1 17.25 19h-10.5A2.75 2.75 0 0 1 4 16.25v-7A2.75 2.75 0 0 1 6.75 6.5h1.73l1.02-1.25ZM12 16.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0-1.5a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Z" />
  </svg>
);

const BackIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M13.53 7.47a.75.75 0 0 1 0 1.06L10.06 12l3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0Z" />
  </svg>
);

const OnboardingModal: React.FC<Props> = ({
  open,
  initialImage,
  initialUsername,
}) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [image, setImage] = useState(initialImage ?? "");
  const [username, setUsername] = useState(initialUsername ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasImage = image.trim().length > 0;

  const onPickImage = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  async function onNext() {
    setError("");

    if (step === 1) {
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

    router.replace("/home");
    router.refresh();
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-[94vw]! max-w-180 sm:max-w-180! max-h-[90vh] rounded-2xl px-4 overflow-hidden [&>button]:hidden">
        <div className="flex h-full max-h-[90vh] flex-col space-y-6 px-8">
          <div className="shrink-0 px-8 pt-4 pb-4">
            <Image
              alt="x image"
              src="/image.jpg"
              width={48}
              height={48}
              className="object-contain mx-auto"
            />
          </div>

          <div className="px-8 pt-1 pb-5">
            <DialogTitle className="text-[28px] font-bold leading-9 tracking-tight text-black">
              {step === 1 ? "Pick a profile picture" : "Choose a username"}
            </DialogTitle>

            <p className="mt-4 max-w-115 text-[15px] leading-5 text-zinc-500 ">
              {step === 1
                ? "Have a favorite selfie? Upload it now."
                : "People will use this to mention you. You can change it later."}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-11 pb-8">
            {step === 1 ? (
              <div className="flex h-full flex-col items-center pt-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="group relative h-52 w-52 overflow-hidden rounded-full bg-zinc-200"
                >
                  {hasImage ? (
                    <img
                      src={image}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400">
                      <span className="text-sm font-medium">Add photo</span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55">
                      <CameraIcon />
                    </div>
                  </div>
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickImage(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="pt-1">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-200">
                    {hasImage ? (
                      <img
                        src={image}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                        No photo
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setStep(1);
                    }}
                    className="text-[14px] font-medium text-[#1d9bf0] hover:underline"
                  >
                    Change photo
                  </button>
                </div>

                <div className="space-y-2">
                  <FloatingInputLabel
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <p className="text-[13px] leading-4 text-zinc-500">
                    Your username is unique. You can always change it later.
                  </p>
                </div>
              </div>
            )}

            {error ? (
              <p className="mt-4 text-sm text-red-500">{error}</p>
            ) : null}
          </div>

          <div className="shrink-0 w-full max-w-lg mx-auto flex flex-col  p-5">
            <Button
              variant="outline"
              className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100 text-md"
              onClick={onNext}
              disabled={loading}
            >
              {step === 1 ? "Skip for now" : "Finish"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
