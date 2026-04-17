"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProfilePopover from "./profile-popover";
import { LucideDot } from "lucide-react";
import MoreDetails from "@/components/ui/more-details";
import { AllPostContainerProps } from "@/types";
import PostActionBar from "./post-action-bar";

const AllPostsContainer: React.FC<AllPostContainerProps> = ({
  post,
  currentUser,
}) => {
  const [formattedDate, setFormattedDate] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const updateDate = () => {
      const now = dayjs();
      const createdAt = dayjs(post.createdAt);
      const timeDiff = now.diff(createdAt, "second");

      let formattedDate;
      if (timeDiff < 60) {
        formattedDate = `${timeDiff}s`;
      } else if (timeDiff < 3600) {
        formattedDate = `${Math.floor(timeDiff / 60)}m`;
      } else if (timeDiff < 86400) {
        formattedDate = `${Math.floor(timeDiff / 3600)}h`;
      } else if (now.year() !== createdAt.year()) {
        formattedDate = createdAt.format("MMM D, YYYY");
      } else if (
        now.month() !== createdAt.month() ||
        now.date() !== createdAt.date()
      ) {
        formattedDate = createdAt.format("MMM D");
      } else {
        formattedDate = createdAt.format("h:mm A");
      }

      setFormattedDate(formattedDate);
    };

    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, [post.createdAt]);
  return (
    <article
      key={post.id}
      className="flex gap-3 cursor-pointer border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
    >
      {/* Avatar column */}
      <div className="shrink-0">
        <ProfilePopover
          name={post.author.name}
          userName={post.author.username || ""}
          profileImage={post.profileImage || ""}
          bio={post.author.bio || ""}
        >
          <Link
            href={`/${post.author.username || ""}`}
            className="block w-10 h-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={post.profileImage || ""}
              alt="profile image"
              fill
              className="rounded-full object-cover"
            />
          </Link>
        </ProfilePopover>
      </div>

      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header: name · username · time · more */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0">
            <ProfilePopover
              name={post.author.name}
              userName={post.author.username || ""}
              profileImage={post.profileImage || ""}
              bio={post.author.bio || ""}
            >
              <Link
                href={`/${post.author.username || ""}`}
                className="font-bold text-md truncate hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {post.author.name}
              </Link>
            </ProfilePopover>
            <span className="text-gray-500 text-sm truncate">
              @{post.author.username || ""}
            </span>
            <span className="text-gray-500 flex items-center text-sm shrink-0">
              <LucideDot className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <MoreDetails
              postId={post.id}
              authorId={post.authorId}
              currentUserId={currentUser?.id ?? ""}
            />
          </div>
        </div>

        {/* Post body */}
        <div
          onClick={() => {
            router.push(`/${post.author.username || ""}/status/${post.id}`);
          }}
          className="flex flex-col gap-3 mt-1"
        >
          {post.content && (
            <p className="text-lg leading-normal wrap-break-words">
              {post.content}
            </p>
          )}

          {post.image && (
            <Link
              href={`/${post.author.username || ""}/status/${post.id}/photo/1`}
              className="block w-full h-72 relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={post.image}
                alt="image posted by the user"
                fill
                className="object-cover"
              />
            </Link>
          )}
        </div>

        {/* Action buttons placeholder */}
        <PostActionBar
          postId={post.id}
          content={post.content || ""}
          username={post.author.username || ""}
          profileImage={post.profileImage || ""}
          authorName={post.author.name}
          isLiked={post.isLiked}
          isReposted={post.isReposted}
          isBookmarked={post.isBookmarked}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          repostsCount={post.repostsCount}
          bookmarkCount={post.bookmarksCount}
        />
      </div>
    </article>
  );
};

export default AllPostsContainer;
