"use client";

import React from "react";
import PostComposer from "./post-composer";
import { PostyourreplyButtonProps } from "@/types";

const PostyourreplyButton = (props: PostyourreplyButtonProps) => {
  return (
    <PostComposer
      userImage={props.profileImage}
      value={props.comments}
      onChange={props.setComments}
      placeholder="Post your reply"
      pending={props.isPending}
      disabled={props.isPending || !props.comments.trim()}
      submitText="Reply"
      submitType="button"
      onSubmit={props.handleComments}
      replyingTo={props.username}
      showMediaSelectors={false}
    />
  );
};

export default PostyourreplyButton;
