"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createPostAction } from "@/lib/actions/post-actions/create-post-action";

type CreatePostState = {
  success: boolean;
  error?: string;
};

type Props = {
  content: string;
  onPosted?: () => void;
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

export default function CreatePostForm({ content, onPosted }: Props) {
  const [state, formAction] = useActionState(createPostAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      onPosted?.();
    }
  }, [state.success, onPosted]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="inline-flex items-center"
    >
      <input type="hidden" name="content" value={content} />
      <SubmitButton disabled={!content.trim()} />
    </form>
  );
}
