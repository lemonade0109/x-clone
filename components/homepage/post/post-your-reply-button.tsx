"use client";
import { createCommentAction } from "@/lib/actions/post-actions/comment-post-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import type { PostYourReplyButtonProps } from "@/types";
import { toast } from "sonner";
import PostComposer from "./post-composer";

const PostYourReplyButton = (props: PostYourReplyButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [replyText, setReplyText] = React.useState("");

  const handleReply = () => {
    const content = replyText.trim();
    if (!content) {
      toast.error("Reply cannot be empty.");
      return;
    }

    startTransition(async () => {
      const result = await createCommentAction(props.postId, content);

      if (!result?.success) {
        toast.error(result?.error || "Something went wrong.");
        return;
      }

      toast.success("Reply posted.");
      setReplyText("");
      props.setIsReplyModalOpen?.(false);
      props.onSuccess?.();
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col w-full gap-3 px-4 py-2">
      {!props.hideAvatar && (
        <p className="mb-3 ml-24 text-md text-zinc-500">
          Replying to <span className="text-sky-500">@{props.userName}</span>
        </p>
      )}

      <div className="flex w-full px-3">
        {!props.hideAvatar && (
          <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden mr-2">
            <Image
              src={props.currentUserImage || "/default-profile.png"}
              alt="profile image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <PostComposer
          hideProfileImage
          value={replyText}
          onChange={setReplyText}
          placeholder="Post your reply"
          disabled={isPending || !replyText.trim()}
          autoFocus={props.autoFocus}
          onSubmit={handleReply}
          submitType="button"
          submitText={isPending ? "Replying..." : "Reply"}
        />
      </div>
    </div>
  );
};

export default PostYourReplyButton;
