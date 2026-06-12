"use client";
import { createCommentAction } from "@/lib/actions/post-actions/comment-post-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import PostComposer from "./post-composer";

//TODO: Setup the reply component to match my current x post-detail-compenent.
export interface PostYourReplyButtonProps {
  userName: string;
  postId: string;
  profileImage: string;
  setIsReplyModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

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
      <p className="mb-3 ml-24 text-md text-zinc-500">
        Replying to <span className="text-sky-500">@{props.userName}</span>
      </p>

      <div className="flex w-full px-3">
        <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden">
          <Image
            src={props.profileImage || "/default-profile.png"}
            alt="profile image"
            fill
            className="object-cover"
          />
        </div>

        <PostComposer
          value={replyText}
          onChange={setReplyText}
          placeholder="Post your reply"
          disabled={isPending || !replyText.trim()}
          onSubmit={handleReply}
          submitType="button"
          submitText={isPending ? "Replying..." : "Reply"}
        />
      </div>
    </div>
  );
};

export default PostYourReplyButton;
