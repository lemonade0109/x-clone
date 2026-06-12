"use client";
import { useToast } from "@/hooks/use-toast";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { replyTweet } from "@/lib/actions/tweet/tweetActions";
import UploadPost from "./uploadPost";

//TODO: Setup the reply component to match my current x post-detail-compenent.
export interface PostYourReplyButtonProps {
  userName: string;
  tweetId: string;
  profileImage: string;
  setIsReplyModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostYourReplyButton = (props: PostYourReplyButtonProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isReplyPending, startTransition] = React.useTransition();
  const [replyText, setReplyText] = React.useState<string>("");

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
          Replying to <span className="text-twitter"> @{props.userName} </span>
        </div>

        <UploadPost
          autoFocus={true}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Post your reply"
          disabled={isReplyPending}
          onClick={() => {
            if (userId) {
              startTransition(() => {
                replyTweet({
                  replyText,
                  tweetId: props.tweetId,
                })
                  .then(() => {
                    if (props.setIsReplyModalOpen === undefined) return;
                    props.setIsReplyModalOpen(false);
                  })
                  .catch(() => {
                    toast({
                      description: "Something went wrong",
                    });
                  });
              });
            } else {
              toast({
                description: "Please login to reply a tweet",
              });
            }
          }}
          buttonType="submit"
          buttonText="Reply"
        />
      </div>
    </div>
  );
};

export default PostyourreplyButton;
