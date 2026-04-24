"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toggleBookmarkAction } from "@/lib/actions/post-actions/bookmark-post-action";
import { createCommentAction } from "@/lib/actions/post-actions/comment-post-action";
import { toggleLikeAction } from "@/lib/actions/post-actions/like-post-action";
import { toggleRepostAction } from "@/lib/actions/post-actions/repost-post-action";
import React, { Fragment } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { toast } from "sonner";
import { PostActionBarProps } from "@/types";
import { FaRegComment } from "react-icons/fa6";
import Link from "next/link";
import TooltipContainer from "@/components/ui/tooltip-container";
import Image from "next/image";
import PostyourreplyButton from "./post-your-reply-button";

const PostActionBar: React.FC<PostActionBarProps> = ({
  postId,
  likesCount,
  commentsCount,
  repostsCount,
  bookmarkCount,
  isLiked,
  isReposted,
  isBookmarked,
  username,
  profileImage,
  authorName,
  content,
}) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [reposted, setReposted] = React.useState(isReposted);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const [likes, setLikes] = React.useState(likesCount);
  const [reposts, setReposts] = React.useState(repostsCount);
  const [bookmarks, setBookmarks] = React.useState(bookmarkCount);
  const [comments, setComments] = React.useState("");
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handleLike = () => {
    startTransition(async () => {
      const prev = liked;
      setLiked(!prev);
      setLikes((c) => (prev ? c - 1 : c + 1));
      const res = await toggleLikeAction(postId);
      if (!res.success) {
        setLiked(prev);
        setLikes((c) => (prev ? c + 1 : c - 1));
        toast.error(res.error || "Failed to like the post.");
      }
    });
  };

  const handleRepost = () => {
    startTransition(async () => {
      const prev = reposted;
      setReposted(!prev);
      setReposts((c) => (prev ? c - 1 : c + 1));
      const res = await toggleRepostAction(postId);
      if (!res.success) {
        setReposted(prev);
        setReposts((c) => (prev ? c + 1 : c - 1));
        toast.error(res.error || "Failed to repost.");
      } else {
        toast.success(prev ? "Repost removed." : "Post reposted.");
      }
    });
  };

  const handleBookmark = () => {
    startTransition(async () => {
      const prev = bookmarked;
      setBookmarked(!prev);
      setBookmarks((c) => (prev ? c - 1 : c + 1));
      const res = await toggleBookmarkAction(postId);
      if (!res.success) {
        setBookmarked(prev);
        setBookmarks((c) => (prev ? c + 1 : c - 1));
        toast.error(res.error || "Failed to bookmark.");
      } else {
        toast.success(prev ? "Bookmark removed." : "Post bookmarked.");
      }
    });
  };

  const handleComment = (mediaUrl?: string | null) => {
    if (!comments.trim() && !mediaUrl?.trim()) return;

    startTransition(async () => {
      const res = await createCommentAction(postId, comments, mediaUrl);
      if (!res.success) {
        toast.error(res.error || "Failed to comment.");
        return;
      }
      toast.success("Comment posted!.");
      setComments("");
      setIsCommentOpen(false);
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      className="flex items-center justify-between mt-3 px-2 max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Comment */}
      <TooltipContainer content="Reply" side="bottom">
        <div className="flex items-center justify-center group">
          <Fragment>
            <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center group-hover:bg-sky/30 rounded-full w-10 h-10">
                  <FaRegComment className="w-5 h-5 text-gray-500 group-hover:text-sky-500 " />
                </div>
              </DialogTrigger>

              <DialogContent className="flex flex-col max-w-3xl h-auto py-12 gap-24 lg:rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-4">
                    <div className="w-12 h-12  rounded-full relative">
                      <Image
                        src={profileImage}
                        alt={"Profile Image"}
                        fill
                        className="rounded-full"
                      />
                    </div>

                    <div className="flex justify-between ">
                      <Link
                        href={`/${username}`}
                        className="flex items-center space-x-2"
                      >
                        <h3 className="font-bold text-lg truncate">
                          {authorName}
                        </h3>
                        <p className="text-gray-500 tracking-normal truncate">
                          @{username}
                        </p>
                      </Link>
                    </div>
                  </DialogTitle>

                  <DialogDescription className="max-w-sm pl-16">
                    <span className="text-lg text-white">{content}</span>
                  </DialogDescription>
                </DialogHeader>

                <PostyourreplyButton
                  profileImage={profileImage}
                  username={username}
                  comments={comments}
                  postId={postId}
                  setIsCommentOpen={setIsCommentOpen}
                  setComments={setComments}
                  handleComments={handleComment}
                  isPending={isPending}
                />
              </DialogContent>
            </Dialog>

            <span className="text-gray-500 group-hover:text-sky-500">
              {commentsCount ?? 0}
            </span>
          </Fragment>
        </div>
      </TooltipContainer>

      {/* Repost */}
      <TooltipContainer content="Repost" side="bottom">
        <button
          type="button"
          onClick={handleRepost}
          disabled={isPending}
          className="group flex items-center gap-2 text-zinc-500 hover:text-green-500"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full group-hover:bg-green-500/15 ${reposted ? "text-green-500" : ""}`}
          >
            <AiOutlineRetweet className="h-5 w-5" />
          </span>
          <span className={`text-sm${reposted ? "text-green-500" : ""}`}>
            {reposts}
          </span>
        </button>
      </TooltipContainer>

      {/* Like */}
      <TooltipContainer content="Like" side="bottom">
        <button
          type="button"
          onClick={handleLike}
          disabled={isPending}
          className="group flex items-center gap-2 text-zinc-500 hover:text-pink-500"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full group-hover:bg-pink-500/15">
            {liked ? (
              <AiFillHeart className="h-5 w-5 text-pink-500" />
            ) : (
              <AiOutlineHeart className="h-5 w-5" />
            )}
          </span>
          <span className={`text-sm${liked ? "text-pink-500" : ""}`}>
            {likes}
          </span>
        </button>
      </TooltipContainer>

      {/* Bookmark */}
      <TooltipContainer content="Bookmark" side="bottom">
        <button
          type="button"
          onClick={handleBookmark}
          disabled={isPending}
          className="group flex items-center gap-2 text-zinc-500 hover:text-sky-500"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full group-hover:bg-sky-500/15">
            {bookmarked ? (
              <BsBookmarkFill className="h-5 w-5 text-sky-500" />
            ) : (
              <BsBookmark className="h-5 w-5" />
            )}
          </span>
          <span className={`text-sm${bookmarked ? "text-sky-500" : ""}`}>
            {bookmarks}
          </span>
        </button>
      </TooltipContainer>

      {/* share */}
      <TooltipContainer content="Share" side="bottom">
        <button
          type="button"
          onClick={handleShare}
          className="flex h-9 w-9 items-center justify-center rounded-full  text-zinc-500 hover:bg-sky-500/15 hover:text-sky-500"
        >
          <FiShare className="h-5 w-5" />
        </button>
      </TooltipContainer>
    </div>
  );
};

export default PostActionBar;
