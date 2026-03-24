"use client";

import { createPostAction } from "@/lib/actions/post-actions/create-post-action";
import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  success: false,
  error: "",
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Posting..." : "Post"}
    </button>
  );
}

export default function CreatePostForm() {
  const [state, formAction] = useActionState(createPostAction, initialState);
  const [content, setContent] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) {
      setContent("");
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What is happening?"
        maxLength={280}
        className="min-h-28 w-full resize-none rounded-xl p-4 outline-none border"
      />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{content.length}/280</span>
        <SubmitButton disabled={!content.trim()} />
      </div>
    </form>
  );
}
