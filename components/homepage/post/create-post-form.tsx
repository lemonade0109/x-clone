"use client";

import React, { ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { createPostAction } from "@/lib/actions/post-actions/create-post-action";
import IconSelectors from "@/components/ui/icon-selector";
import FormContainer from "@/components/shared/form/form-container";
import { CreatePostState, Props } from "@/types";
import PostComposer from "./post-composer";

const initialState: CreatePostState = { success: false };

function SubmitButton({
  disabled,
  pending,
}: {
  disabled: boolean;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="h-9 min-w-18 rounded-full bg-black dark:bg-white px-4 text-[15px] font-bold text-white dark:text-black transition hover:bg-gray-800 dark:hover:bg-white/90 disabled:bg-gray-400 disabled:text-white/70 dark:disabled:bg-gray-500 dark:disabled:text-black/70"
    >
      {pending ? "Posting..." : "Post"}
    </button>
  );
}

export default function CreatePostForm({ userImage }: Props) {
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <FormContainer
      className="w-full"
      action={createPostAction}
      initialState={initialState}
      onSuccess={() => {
        setContent("");
        setImage(null);
        setImageUrl(null);
      }}
    >
      {({ pending, state }) => (
        <>
          <input type="hidden" name="imageUrl" value={imageUrl || ""} />

          <PostComposer
            userImage={userImage}
            value={content}
            onChange={setContent}
            placeholder="What's happening!"
            pending={pending}
            disabled={!content.trim() && !image && !imageUrl}
            submitText="Post"
            submitType="submit"
            error={state.error}
            imageUrl={imageUrl}
            onRemoveImage={() => {
              setImage(null);
              setImageUrl(null);
            }}
            addImageToPost={addImageToPost}
            onEmojiSelect={(emoji) => setContent((prev) => prev + emoji)}
            onGifSelect={(gifUrl) => {
              setImage(null);
              setImageUrl(gifUrl);
            }}
            showMediaSelectors
          />
        </>
      )}
    </FormContainer>
  );
}
