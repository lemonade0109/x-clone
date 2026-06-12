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
import { toggleLikeAction } from "@/lib/actions/post-actions/like-post-action";
import { toggleRepostAction } from "@/lib/actions/post-actions/repost-post-action";
import React, { Fragment } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { toast } from "sonner";
import { PostActionBarProps } from "@/types";
import { FaRegComment } from "react-icons/fa6";
import Link from "next/link";
import TooltipContainer from "@/components/ui/tooltip-container";
import Image from "next/image";
import PostYourReplyButton from "./post-your-reply-button";

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
  classname,
}) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [reposted, setReposted] = React.useState(isReposted);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const [likes, setLikes] = React.useState(likesCount);
  const [reposts, setReposts] = React.useState(repostsCount);
  const [bookmarks, setBookmarks] = React.useState(bookmarkCount);
  const [commentTotal, setCommentTotal] = React.useState(commentsCount ?? 0);
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

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${username}/status/${postId}`,
    );
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      className={`flex items-center justify-between mt-3 px-2 ${classname ?? "max-w-md"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Comment */}
      <TooltipContainer content="Reply" side="bottom">
        <div className="group flex items-center justify-center">
          <Fragment>
            <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
              <DialogTrigger asChild>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full group-hover:bg-sky/30">
                  <FaRegComment className="h-5 w-5 text-gray-500 group-hover:text-sky-500" />
                </div>
              </DialogTrigger>

              <DialogContent className="flex h-auto max-w-3xl flex-col gap-10 py-8 lg:rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 rounded-full">
                      <Image
                        src={profileImage || "/default-profile.png"}
                        alt="Profile Image"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Link
                        href={`/${username}`}
                        className="flex items-center space-x-2"
                      >
                        <h3 className="truncate text-lg font-bold">
                          {authorName}
                        </h3>
                        <p className="truncate tracking-normal text-gray-500">
                          @{username}
                        </p>
                      </Link>
                    </div>
                  </DialogTitle>

                  <DialogDescription className="max-w-sm pl-16">
                    <span className="text-base text-zinc-800 dark:text-zinc-100">
                      {content}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <PostYourReplyButton
                  profileImage={profileImage || "/default-profile.png"}
                  userName={username}
                  postId={postId}
                  setIsReplyModalOpen={setIsCommentOpen}
                  onSuccess={() => setCommentTotal((c) => c + 1)}
                />
              </DialogContent>
            </Dialog>

            <span className="text-gray-500 group-hover:text-sky-500">
              {commentTotal}
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
          <span className={`text-sm ${reposted ? "text-green-500" : ""}`}>
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
          <span className={`text-sm ${liked ? "text-pink-500" : ""}`}>
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
          <span className={`text-sm ${bookmarked ? "text-sky-500" : ""}`}>
            {bookmarks}
          </span>
        </button>
      </TooltipContainer>

      {/* share */}
      <TooltipContainer content="Share" side="bottom">
        <button
          type="button"
          onClick={handleShare}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-sky-500/15 hover:text-sky-500"
        >
          <FiShare className="h-5 w-5" />
        </button>
      </TooltipContainer>
    </div>
  );
};

export default PostActionBar;
