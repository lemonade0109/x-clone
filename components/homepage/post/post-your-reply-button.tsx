"use client";

import Image from "next/image";
import React from "react";
import UploadPost from "./uploadPost";

export interface PostyourreplyButtonProps {
  username: string;
  postId: string;
  profileImage: string;
  setIsCommentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  handleComments: () => void;
  isPending: boolean;
}

const PostyourreplyButton = (props: PostyourreplyButtonProps) => {
  return (
    <div className="flex space-x-3">
      <div className="flex items-center pl-2">
        <div className="w-14 h-14 rounded-full relative">
          <Image
            src={props.profileImage}
            alt="profile image"
            fill
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full ">
        <div className="flex mt-5 mb-10 gap-2 text-gray-500 pl-16 pr-4 ">
          Replying to <span className="text-twitter"> @{props.username} </span>
        </div>

        <UploadPost
          autoFocus={true}
          value={props.comments}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            props.setComments(e.target.value)
          }
          placeholder="Post your reply"
          disabled={props.isPending || !props.comments.trim()}
          onClick={props.handleComments}
          buttonType="submit"
          buttonText="Reply"
        />
      </div>
    </div>
  );
};

export default PostyourreplyButton;
