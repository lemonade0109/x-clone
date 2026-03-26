"use client";

import React, { ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { createPostAction } from "@/lib/actions/post-actions/create-post-action";
import IconSelectors from "@/components/ui/icon-selector";
import FormContainer from "@/components/shared/form/form-container";
import { CreatePostState, Props } from "@/types";

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
      className="h-9 min-w-18 rounded-full bg-black px-4 text-[15px] font-bold text-white transition hover:bg-gray-800 disabled:bg-gray-400 disabled:text-white/70"
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
        <div className="flex w-full gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 font-semibold">
            {userImage ? (
              <img
                src={userImage}
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              "J"
            )}
          </div>

          <div className=" flex flex-col w-full h-full space-y-7 ">
            <textarea
              value={content}
              onChange={handleTextareaChange}
              placeholder={"What's happening!"}
              className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide placeholder:text-3xl"
              name="content"
            />

            <input type="hidden" name="image" value={imageUrl || ""} />

            {imageUrl && (
              <div className="px-4 py-2 relative">
                <img
                  src={imageUrl}
                  alt="Selected preview"
                  className={` object-cover w-full max-h-62.5 rounded-2xl  ${
                    pending ? "animate-pulse" : ""
                  }`}
                />

                <div className="bg-black/80 absolute top-4 right-7 flex items-center justify-center rounded-full hover:bg-black/40 cursor-pointer w-10 h-10">
                  <IoCloseSharp
                    onClick={() => {
                      setImage(null);
                      setImageUrl(null);
                    }}
                    className="w-8 h-8 text-white/70"
                  />
                </div>
              </div>
            )}

            {state.error && (
              <p className="px-3 text-sm text-red-500">{state.error}</p>
            )}

            <div className="flex justify-between px-2 ">
              <IconSelectors
                addImageToPost={addImageToPost}
                onEmojiSelect={(emoji) => {
                  setContent((prev) => prev + emoji);
                }}
                onGifSelect={(gifUrl) => {
                  setImage(null);
                  setImageUrl(gifUrl);
                }}
              />

              {pending ? (
                <div className="">
                  <CgSpinner className="w-12 h-12 text-twitter animate-spin" />
                </div>
              ) : (
                <SubmitButton
                  disabled={!content.trim() && !image}
                  pending={pending}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  );
}
