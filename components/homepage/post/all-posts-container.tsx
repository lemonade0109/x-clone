"use client";
import { PostProps } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProfilePopover from "./profile-popover";
import { LucideDot } from "lucide-react";
import MoreDetails from "@/components/ui/more-details";

const AllPostsContainer: React.FC<PostProps> = (post) => {
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
      className="cursor-pointer border-b border-zinc-200 px-4 py-3 transition hover:bg-zinc-50"
    >
      <div className="flex items-center justify-center w-16 h-14 relative">
        <ProfilePopover
          name={post.author.name}
          userName={post.author.username}
          profileImage={post.profileImage || ""}
          bio={post.author.bio}
        >
          <Link
            href={`/${post.author.username}`}
            className="flex items-center  space-x-1"
          >
            <Image
              src={post.profileImage || ""}
              alt="profile image"
              fill
              className="rounded-full"
            />
          </Link>

          <p>{post.author.name}</p>
        </ProfilePopover>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between ">
          <Link
            href={`/${post.author.username}`}
            className="flex items-center  space-x-1"
          >
            <ProfilePopover
              name={post.author.name}
              userName={post.author.username}
              profileImage={post.profileImage || ""}
              bio={post.author.bio}
            >
              <h3 className="font-bold text-lg truncate hover:underline">
                {post.author.name}
              </h3>
            </ProfilePopover>
            <p className="text-gray-500 tracking-normal truncate ">
              @{post.author.username}
            </p>
            <div className="flex justify-center items-center text-gray-600">
              <LucideDot />

              <p>{formattedDate}</p>
            </div>
          </Link>

          <MoreDetails postId={post.id} authorId={post.authorId} />
        </div>

        <div
          onClick={() => {
            router.push(`/${post.author.username}/status/${post.id}`);
          }}
          className="flex flex-col justify-center space-y-2 cursor-pointer"
        >
          <p className="text-lg text-start max-w-2xl">{post.content}</p>

          {post.image && (
            <Link
              href={`/${post.author.username}/status/${post.id}/photo/1`}
              className=" w-full h-96 rounded-xl relative"
            >
              <Image
                src={post.image || ""}
                alt={"image posted by the user"}
                fill
                className="rounded-xl"
              />
            </Link>
          )}
        </div>

        {/* <div className="flex justify-between">
          <CommentIcon
            name={props.name}
            profileImage={props.profileImage}
            tweetId={props.tweetId!}
            tweetTxt={props.tweetTxt}
            userName={props.userName}
            commentCount={props.commentCount}
          />
          <RetweetIcon
            isRetweeted={props.isReposted}
            id={props.tweetId!}
            retweetCount={props.repostCount}
          />
          <LikeIcon
            likesCount={props.likeCount}
            isLiked={props.isLiked}
            id={props.tweetId!}
          />
          <BookmarkIcon isBookmarked={props.isBookmarked} id={props.tweetId!} />
        </div> */}
      </div>
    </article>
  );
};

export default AllPostsContainer;
