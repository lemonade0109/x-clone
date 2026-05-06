import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Image from "next/image";
import { CommentCardProps } from "@/types";

dayjs.extend(relativeTime);

const PostCommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <article className="flex gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
      {/* Avatar */}
      <Link href={`/${comment.author.username}`} className="shrink-0">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={comment.author.image ?? "/default-avatar.png"}
            alt={`${comment.author.name} avatar`}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex-flex-wrap items-center gap-1">
          <Link
            href={`/${comment.author.username}`}
            className="font-medium hover:underline"
          >
            {comment.author.name}
          </Link>
          <span className="text-zinc-500">
            @{comment.author.username} · {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-[15px] leading-6">
          {comment.content}
        </p>
      </div>
    </article>
  );
};

export default PostCommentCard;
