import { PostDetailSectionProps } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import PostCommentCard from "./post-comment-card";
import AllPostsContainer from "./all-posts-container";

const PostDetailSection: React.FC<PostDetailSectionProps> = ({
  post,
  comments,
  currentUserId,
}) => {
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
      <div className="flex items-start gap-3 px-4 pt-4">
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

      {/* Stats row */}
      <div className="flex gap-5 border-b border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
        <span>
          <strong>{post.repostCount}</strong>{" "}
          <span className="text-zinc-500">Reposts</span>
        </span>
        <span>
          <strong>{post.likeCount}</strong>{" "}
          <span className="text-zinc-500">Likes</span>
        </span>
        <span>
          <strong>{post.bookmarkCount}</strong>{" "}
          <span className="text-zinc-500">Bookmarks</span>
        </span>
      </div>

      {/* Action bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        {currentUserId && (
          <AllPostsContainer
            post={post}
            currentUser={{ id: currentUserId }}
            // hideContent
          />
        )}
      </div>

      {/* Comments */}
      <div>
        {comments.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No replies yet. Be the first to reply!
          </div>
        ) : (
          comments.map((comment) => (
            <PostCommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
};

export default PostDetailSection;
