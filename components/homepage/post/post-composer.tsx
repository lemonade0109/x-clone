"use client";

import IconSelectors from "@/components/ui/icon-selector";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";

type PostComposerProps = {
  userImage?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;

  pending?: boolean;
  disabled?: boolean;
  submitText?: string;
  submitType?: "submit" | "button";
  onSubmit?: () => void;

  error?: string;
  replyingTo?: string;

  imageUrl?: string | null;
  onRemoveImage?: () => void;

  addImageToPost?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect?: (emoji: string) => void;
  onGifSelect?: (gifUrl: string) => void;
  showMediaSelectors?: boolean;
};

function SubmitButton({
  disabled,
  pending,
  submitType,
  onSubmit,
  submitText = "Post",
}: {
  disabled: boolean;
  pending: boolean;
  submitType: "submit" | "button";
  onSubmit?: () => void;
  submitText?: string;
}) {
  return (
    <button
      type={submitType}
      onClick={submitType === "button" ? onSubmit : undefined}
      disabled={disabled || pending}
      className="h-9 min-w-18 rounded-full bg-black dark:bg-white px-4 text-[15px] font-bold text-white dark:text-black transition hover:bg-gray-800 dark:hover:bg-white/90 disabled:bg-gray-400 disabled:text-white/70 dark:disabled:bg-gray-500 dark:disabled:text-black/70"
    >
      {pending ? `${submitText}...` : submitText}
    </button>
  );
}

const PostComposer: React.FC<PostComposerProps> = ({
  userImage,
  value,
  onChange,
  placeholder = "What's happening?",
  pending = false,
  disabled = false,
  submitText = "Post",
  submitType = "submit",
  onSubmit,
  error,
  replyingTo,
  imageUrl,
  onRemoveImage,
  addImageToPost,
  onEmojiSelect,
  onGifSelect,
  showMediaSelectors = true,
}) => {
  return (
    <div className="flex w-full gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 font-semibold">
        {userImage ? (
          <img
            src={userImage}
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span>U</span>
        )}
      </div>

      <div className="flex flex-col w-full h-full space-y-5">
        {replyingTo && (
          <p className="px-1 text-sm text-zinc-500">
            Replying to <span className="text-sky-500">{replyingTo}</span>
          </p>
        )}

        <textarea
          value={value}
          name="content"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none rounded-xl border-none tracking-wide placeholder:text-2xl outline-none"
        />

        {imageUrl && (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Selected preview"
              className={`object-cover w-full max-h-[420px] rounded-2xl ${pending ? "animate-pulse" : ""}`}
            />

            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 hover:bg-black/60"
            >
              <IoCloseSharp className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-between mb-3">
          {showMediaSelectors &&
          (addImageToPost || onEmojiSelect || onGifSelect) ? (
            <IconSelectors
              addImageToPost={addImageToPost}
              onEmojiSelect={onEmojiSelect}
              onGifSelect={onGifSelect}
            />
          ) : (
            <div className="h-9" />
          )}

          {pending ? (
            <div className="">
              <CgSpinner className="w-12 h-12 text-twitter animate-spin" />
            </div>
          ) : (
            <SubmitButton
              disabled={!value.trim() && !imageUrl}
              pending={pending}
              submitType={submitType}
              onSubmit={onSubmit}
              submitText={submitText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
