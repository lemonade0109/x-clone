import React, { Suspense } from "react";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import FollowButton from "./follow-button";
import ProfileTabs from "./profile-tabs";
import { FaLink, FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import dayjs from "dayjs";
import { CgSpinner } from "react-icons/cg";
import AllPostsContainer from "@/components/homepage/post/all-posts-container";
import { PostItem, ProfileReply, ProfileTab, ProfileUserInfo } from "@/types";

type ProfilePageSectionProps = {
  profile: ProfileUserInfo;
  posts: PostItem[];
  replies: ProfileReply[];
  activeTab: ProfileTab;
};

const ProfilePageSection: React.FC<ProfilePageSectionProps> = ({
  profile,
  posts,
  replies,
  activeTab,
}) => {
  const handle = profile.username ? `@${profile.username}` : "";

  return (
    <section className="min-h-screen w-full max-w-150 border-x border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-white/80 dark:bg-black/80 px-4 py-3 backdrop-blur">
        <Link href="/home">
          <GoArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-zinc-500">{profile.postsCount} posts</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 w-full bg-zinc-300">
        {profile.coverImage && (
          <Image
            src={profile.coverImage}
            alt="Cover Image"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/*  Avatar + Follow Button */}
      <div className="relative flex items-end justify-between px-4 pb-3">
        <div className="absolute -top-16 left-4 h-32 w-32 rounded-full border-4 border-white dark:border-black">
          <Image
            src={profile.image || "/default-profile.png"}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div />

        <div className="mt-5">
          {profile.isOwner ? (
            <Link
              href="/settings/profile"
              className="rounded-full border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-bold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Edit profile
            </Link>
          ) : (
            <FollowButton
              isFollowing={profile.isFollowing}
              targetUserId={profile.id}
            />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-14 space-y-3 px-4 pb-3">
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-zinc-500">@{profile.username}</p>
        </div>

        {profile.bio && <p className="text-[15px] leading-6">{profile.bio}</p>}

        <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
          {profile.location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="h-4 w-4" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-600 hover:underline"
            >
              <FaLink className="h-4 w-4" />
              {profile.website}
            </a>
          )}
          <span className="flex items-center gap-1">
            <FaCalendarDays className="h-4 w-4" />
            Joined {dayjs(profile.createdAt).format("MMMM YYYY")}
          </span>
        </div>

        {/* Following / Followers */}
        <div className="flex gap-5 text-sm">
          <Link
            href={`/${profile.username}/following`}
            className="hover:underline gap-1 flex items-center"
          >
            <span className="font-bold text-black dark:text-white">
              {profile.followingCount}
            </span>
            <span className="text-zinc-500">Following</span>
          </Link>
          <Link
            href={`/${profile.username}/followers`}
            className="hover:underline gap-1 flex items-center"
          >
            <span className="font-bold text-black dark:text-white">
              {profile.followersCount}
            </span>
            <span className="text-zinc-500">Followers</span>
          </Link>
        </div>
      </div>

      {/* Posts Tab */}
      <ProfileTabs username={profile.username ?? ""} activeTab={activeTab} />

      {/* Posts */}
      <Suspense
        fallback={
          <CgSpinner
            className="mx-auto mt-5 animate-spin text-2xl text-sky-500"
            size={24}
          />
        }
      >
        {activeTab === "replies" ? (
          replies.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No replies yet.</div>
          ) : (
            replies.map((reply) => (
              <Link
                key={reply.id}
                href={`/${reply.post.author.username}/status/${reply.postId}`}
                className="block border-b border-zinc-200 px-4 py-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
              >
                <p className="text-sm text-zinc-500">
                  Replying to @{reply.post.author.username}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-[15px]">
                  {reply.content}
                </p>
              </Link>
            ))
          )
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No posts yet.</div>
        ) : (
          posts.map((post) => (
            <AllPostsContainer
              key={post.id}
              post={post}
              currentUser={{ id: profile.currentUserId ?? "" }}
            />
          ))
        )}
      </Suspense>
    </section>
  );
};

export default ProfilePageSection;
