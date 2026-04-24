"use client";

import React from "react";
import PostComposer from "./post-composer";
import { PostyourreplyButtonProps } from "@/types";

const PostyourreplyButton = (props: PostyourreplyButtonProps) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <PostComposer
      userImage={props.profileImage}
      value={props.comments}
      onChange={props.setComments}
      placeholder="Post your reply"
      pending={props.isPending}
      disabled={props.isPending || (!props.comments.trim() && !imageUrl)}
      submitText="Reply"
      submitType="button"
      onSubmit={() => props.handleComments(imageUrl)}
      replyingTo={props.username}
      imageUrl={imageUrl}
      onRemoveImage={() => setImageUrl(null)}
      addImageToPost={addImageToPost}
      onEmojiSelect={(emoji) => {
        props.setComments((prev) => prev + emoji);
      }}
      onGifSelect={(gifUrl) => {
        setImageUrl(gifUrl);
      }}
      showMediaSelectors={true}
    />
  );
};

export default PostyourreplyButton;
