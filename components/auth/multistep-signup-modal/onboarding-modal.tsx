"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInputLabel from "@/components/shared/floating-input-label";
import {
  checkUsernameAvailabilityAction,
  completeOnboardingAction,
} from "@/lib/actions/onboarding-action";
import { uploadImageAction } from "@/lib/actions/user/upload-image";
import { LoaderCircle } from "lucide-react";

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

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 fill-white"
  >
    <path d="M9.96 18.1 4.87 13l1.41-1.41 3.68 3.68 7.76-7.77 1.42 1.42-9.18 9.18Z" />
  </svg>
);

const WrongIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 fill-white"
  >
    <path d="m13.41 12 4.3-4.29-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42L10.59 12l-4.3 4.29 1.42 1.42 4.29-4.3 4.29 4.3 1.42-1.42z" />
  </svg>
);

const normalizeUsername = (value: string) =>
  value
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 15);

const OnboardingModal: React.FC<Props> = ({
  open,
  initialImage,
  initialUsername,
}) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = React.useState<1 | 2>(1);
  const [image, setImage] = React.useState(initialImage ?? "");
  const [uploading, setUploading] = React.useState(false);
  const [username, setUsername] = React.useState(initialUsername ?? "");
  const [usernameFocused, setUsernameFocused] = React.useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [usernameStatus, setUsernameStatus] = React.useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");

  const cleanUsername = normalizeUsername(username);
  const isUsernameValid = /^[a-z0-9_]{4,15}$/.test(cleanUsername);
  const shouldShowSuggestions = cleanUsername.length >= 4;

  const suggestedUsernames = React.useMemo(() => {
    const seed =
      (cleanUsername || initialUsername || "")
        .replace(/^@+/, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .slice(0, 10) || "";

    if (seed.length < 4) {
      return [];
    }

    return Array.from(
      new Set([
        `@${seed}`,
        `@${seed}_`,
        `@${seed}01`,
        `@the${seed}`,
        `@real${seed}`,
      ]),
    );
  }, [cleanUsername, initialUsername]);

  const visibleSuggestions = showAllSuggestions
    ? suggestedUsernames
    : suggestedUsernames.slice(0, 2);

  React.useEffect(() => {
    let active = true;

    if (step !== 2) return;
    if (!cleanUsername) {
      setUsernameStatus("idle");
      return;
    }

    if (!isUsernameValid) {
      setUsernameStatus("invalid");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(async () => {
      const res = await checkUsernameAvailabilityAction(cleanUsername);
      if (!active) return;
      setUsernameStatus(res.available ? "available" : "taken");
    }, 350);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [cleanUsername, isUsernameValid, step]);

  const hasImage = image.trim().length > 0;

  const onPickImage = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      // show instant preview
      setImage(base64);

      //upload to Cloudinary
      const res = await uploadImageAction(base64);
      setUploading(false);

      if (res.error || !res.url) {
        setError(res.error || "Upload failed. Please try again.");
        setImage("");
        return;
      }

      setImage(res.url);
    };
    reader.readAsDataURL(file);
  };

  async function onNext() {
    setError("");

    if (step === 1) {
      setStep(2);
      return;
    }

    if (!isUsernameValid) {
      setError("Username is required.");
      return;
    }

    if (usernameStatus === "taken") {
      setError("Username not available");
      return;
    }

    setLoading(true);

    const res = await completeOnboardingAction({
      username: cleanUsername,
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

  const canFinish =
    step === 2 &&
    isUsernameValid &&
    usernameStatus === "available" &&
    !uploading &&
    !loading;

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

          <div className="px-8 pt-1 pb-2">
            <DialogTitle className="text-[28px] font-bold leading-9 tracking-tight text-black">
              {step === 1
                ? "Pick a profile picture"
                : "What should we call you?"}
            </DialogTitle>

            <p className="mt-2 max-w-115 text-[13px] leading-5 text-zinc-500 ">
              {step === 1
                ? "Have a favorite selfie? Upload it now."
                : " Your @username is unique. You can always change it later."}
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
                      {uploading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <CameraIcon />
                      )}
                    </div>
                  </div>
                </button>

                {uploading ? (
                  <p className="mt-3 text-sm text-zinc-500">Uploading...</p>
                ) : null}

                {error ? (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                ) : null}

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickImage(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="pt-1 mb-32">
                <FloatingInputLabel
                  label="Username"
                  value={cleanUsername}
                  onChange={(e) =>
                    setUsername(normalizeUsername(e.target.value))
                  }
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={15}
                  prefix="@"
                  prefixClassName="top-1/2 -translate-y-1/2 text-[17px]"
                  labelClassName="left-[34px]"
                  className="pl-11 pr-10"
                  error={!!error}
                  suffix={
                    usernameStatus === "taken" ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                        <WrongIcon />
                      </span>
                    ) : usernameStatus === "available" ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00ba7c]">
                        <CheckIcon />
                      </span>
                    ) : null
                  }
                />

                {usernameStatus === "taken" ? (
                  <p className="mt-2 text-sm text-red-500">
                    Username not available
                  </p>
                ) : null}

                <div className="mt-2 space-y-4">
                  {shouldShowSuggestions ? (
                    <div className="mt-7 mb-40 space-y-4">
                      <div className="flex flex-wrap gap-x-2 gap-y-3">
                        {visibleSuggestions.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setUsername(item.replace(/^@/, ""));
                              setError("");
                            }}
                            className="text-[15px] font-medium text-[#1d9bf0] hover:underline"
                          >
                            {item}
                          </button>
                        ))}
                      </div>

                      {!showAllSuggestions &&
                      suggestedUsernames.length > visibleSuggestions.length ? (
                        <button
                          type="button"
                          onClick={() => setShowAllSuggestions(true)}
                          className="text-[15px] font-medium text-[#1d9bf0] hover:underline"
                        >
                          Show more
                        </button>
                      ) : null}
                    </div>
                  ) : null}

                  {error ? (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 w-full max-w-lg mx-auto flex flex-col  p-5">
            <Button
              variant="outline"
              className="w-full border border-gray-300 rounded-full py-6 hover:bg-gray-100 text-lg"
              onClick={onNext}
              disabled={loading || (step === 2 ? !canFinish : false)}
            >
              {uploading
                ? "Uploading..."
                : step === 1
                  ? hasImage
                    ? "Next"
                    : "Skip for now"
                  : loading
                    ? "Saving..."
                    : "Finish"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
