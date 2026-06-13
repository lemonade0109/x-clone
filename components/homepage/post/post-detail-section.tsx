"use client";
import { PostDetailSectionProps } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AllPostsContainer from "./all-posts-container";
import { GoArrowLeft } from "react-icons/go";
import MoreDetails from "@/components/ui/more-details";
import PostActionBar from "./post-action-bar-v2";
import { Button } from "@/components/ui/button";
import PostYourReplyButton from "./post-your-reply-button";

const PostDetailSection: React.FC<PostDetailSectionProps> = ({
  post,
  comments,
  commentsCount,
  currentUserId,
}) => {
  const [showReplyTab, setShowReplyTab] = React.useState<boolean>(false);
  const [commentTotal, setCommentTotal] = React.useState<number>(
    commentsCount ?? 0,
  );

  React.useEffect(() => {
    setCommentTotal(commentsCount ?? 0);
  }, [commentsCount]);

  console.log(comments);
  return (
    <section className="min-h-screen w-full max-w-[600px] border-x border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-white/80 px-4 py-3 backdrop-blur dark:bg-black/80">
        <Link
          href={`/${post.author.username}`}
          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <GoArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      {/* Post author info */}
      <div className="flex justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-3">
          <Link href={`/${post.author.username}`} className="shrink-0">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={post.author.image || "/default-profile.png"}
                alt={`${post.author.name} avatar`}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div>
            <Link
              href={`/${post.author.username}`}
              className="font-bold hover:underline"
            >
              {post.author.name}
            </Link>
            <p className="text-zinc-500">@{post.author.username}</p>
          </div>
        </div>

        <div className="shrink-0">
          <MoreDetails
            postId={post.id}
            authorId={post.authorId}
            currentUserId={currentUserId ?? ""}
          />
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 pt-3">
        <p className="whitespace-pre-wrap leading-6 text-[20px]">
          {post.content}
        </p>

        {post.image && (
          <div className="relative mt-3 h-80 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Post timestamp */}
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          {dayjs(post.createdAt).format("h:mm A · MMM D, YYYY")}
        </p>
      </div>

      {/* Action bar */}
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <PostActionBar
          postId={post.id}
          content={post.content || ""}
          username={post.author.username || ""}
          profileImage={post.author.image || ""}
          authorName={post.author.name}
          isLiked={post.isLiked}
          isReposted={post.isReposted}
          isBookmarked={post.isBookmarked}
          likesCount={post.likeCount}
          commentsCount={post.commentCount}
          repostsCount={post.repostCount}
          bookmarkCount={post.bookmarkCount}
          classname="w-full px-4 py-1"
        />
      </div>

      <div>
        {showReplyTab === false ? (
          <div
            onClick={() => setShowReplyTab(true)}
            className="flex space-x-3 border-b border-gray-800"
          >
            <div className="flex items-center pl-2">
              <div className="w-14 h-14 rounded-full relative">
                <Image
                  src={post.author.image || "/default-profile.png"}
                  alt="profile image"
                  fill
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="flex w-full py-6 ">
              <textarea
                placeholder="Post your reply"
                className="bg-transparent w-full text-start text-xl mb-0 pb-0 border-none  outline-none tracking-wide placeholder:text-2xl"
              />

              <div className="flex pr-2">
                <Button
                  disabled={true}
                  type="submit"
                  className=" font-bold rounded-full  px-6 py-6 text-black text-lg "
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <PostYourReplyButton
            userName={post.author.username || ""}
            postId={post.id}
            profileImage={post.author.image || "/default-profile.png"}
            onSuccess={() => setCommentTotal((prev) => prev + 1)}
            setIsReplyModalOpen={setShowReplyTab}
          />
        )}
      </div>

      {/* Comments */}
      <div>
        {commentTotal === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No replies yet. Be the first to reply!
          </div>
        ) : (
          <div>
            {comments.map((comment) => (
              <AllPostsContainer
                key={comment.id}
                post={{
                  id: comment.id,
                  content: comment.content ?? "",
                  image: comment.image ?? null,
                  createdAt: comment.createdAt,
                  authorId: comment.authorId,
                  author: {
                    id: comment.author.id,
                    name: comment.author.name ?? "",
                    username: comment.author.username ?? null,
                    image: comment.author.image ?? null,
                    bio: comment.author.bio ?? null,
                  },
                  likeCount: comment.likeCount ?? 0,
                  commentCount: comment.commentCount ?? 0,
                  repostCount: comment.repostCount ?? 0,
                  bookmarkCount: comment.bookmarkCount ?? 0,
                  isLiked: comment.isLiked ?? false,
                  isReposted: comment.isReposted ?? false,
                  isBookmarked: comment.isBookmarked ?? false,
                  reposts: [],
                  likes: [],
                  bookmarks: [],
                  _count: {
                    likes: comment.likeCount ?? 0,
                    reposts: comment.repostCount ?? 0,
                    comments: comment.commentCount ?? 0,
                    bookmarks: comment.bookmarkCount ?? 0,
                  },
                }}
                currentUser={{ id: currentUserId ?? "" }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostDetailSection;
