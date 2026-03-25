"use client";

import React, { ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import { createPostAction } from "@/lib/actions/post-actions/create-post-action";
import IconSelectors from "@/components/ui/icon-selector";

type CreatePostState = {
  success: boolean;
  error?: string;
};

type Props = {
  content: string;
  onPosted?: () => void;
  userImage?: string;
};

const initialState: CreatePostState = { success: false };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

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

export default function CreatePostForm({ onPosted, userImage }: Props) {
  const [state, formAction, isPending] = React.useActionState(
    createPostAction,
    initialState,
  );
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

  const handleSubmit = async (formData: FormData) => {
    if (image) {
      formData.append("image", image);
    }

    formAction(formData);
    setContent("");
    setImage(null);
    setImageUrl(null);
  };

  React.useEffect(() => {
    if (state.success) {
      onPosted?.();
    }
  }, [state.success, onPosted]);

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="inline-flex items-center"
    >
      <div className="flex gap-3">
        <input type="hidden" name="content" value={content} />
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 font-semibold">
          {userImage ? (
            <img
              src={userImage}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            "J"
          )}
        </div>

        <div className=" flex flex-col w-full h-full  py-4 space-y-7 bg-black">
          <textarea
            value={content}
            onChange={handleTextareaChange}
            placeholder={"What's happening!"}
            className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide bg-black placeholder:text-3xl"
            name={"text"}
          />

          {imageUrl && (
            <div className="px-4 py-2 relative">
              <img
                src={imageUrl}
                alt="The image selected by the user"
                className={` object-cover w-full max-h-62.5 rounded-2xl  ${
                  isPending ? "animate-pulse" : ""
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

          <div className="flex justify-between px-2 ">
            <IconSelectors addImageToPost={addImageToPost} />
            {isPending ? (
              <div className="">
                <CgSpinner className="w-12 h-12 text-twitter animate-spin" />
              </div>
            ) : (
              <SubmitButton disabled={!content.trim()} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
