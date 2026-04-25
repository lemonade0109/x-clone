import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  Link2,
  Verified,
  Ellipsis,
} from "lucide-react";

type ProfilePageSectionProps = {
  profile: {
    followersCount: number;
    followingCount: number;
    postsCount: number;
    isFollowing: boolean;
    isOwner: boolean;
    currentUserId: string | null;
    name: string;
    id: string;
    username: string | null;
    image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    coverImage: string | null;
    verified: boolean;
    createdAt: Date;
    onboardingCompleted: boolean;
    followers: {
      id: string;
      createdAt: Date;
      followerId: string;
      followingId: string;
    }[];
    _count: {
      posts: number;
      following: number;
      followers: number;
    };
  };
  posts: {
    likeCount: number;
    repostCount: number;
    commentCount: number;
    bookmarkCount: number;
    isLiked: boolean;
    isReposted: boolean;
    isBookmarked: boolean;
    id: string;
    image: string | null;
    createdAt: Date;
    content: string;
    authorId: string;
    reposts: {
      id: string;
      createdAt: Date;
      authorId: string;
      postId: string;
    }[];
    likes: {
      id: string;
      createdAt: Date;
      authorId: string;
      postId: string;
    }[];
    bookmarks: {
      id: string;
      createdAt: Date;
      authorId: string;
      postId: string;
    }[];
    _count: {
      comments: number;
      reposts: number;
      likes: number;
      bookmarks: number;
    };
    author: {
      name: string;
      id: string;
      username: string | null;
      image: string | null;
      bio: string | null;
    };
  }[];
};

const ProfilePageSection: React.FC<ProfilePageSectionProps> = ({
  profile,
  posts,
}) => {
  const handle = profile.username ? `@${profile.username}` : "";

  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="rounded-full p-2 transition hover:bg-zinc-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-xl leading-tight font-extrabold">Jubril</h1>
            <p className="text-[13px] text-zinc-500">248 posts</p>
          </div>
        </div>
      </header>

      <div className="relative h-50 bg-[linear-gradient(120deg,#0f172a_0%,#1d4ed8_60%,#38bdf8_100%)]">
        <div className="absolute bottom-0 left-4 z-10 translate-y-1/2">
          <div className="flex h-35 w-35 items-center justify-center rounded-full border-4 border-white bg-zinc-300 text-4xl font-extrabold text-zinc-700">
            J
          </div>
        </div>
      </div>

      <div className="px-4 pt-18 pb-3">
        <div className="flex items-start justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-bold transition hover:bg-zinc-100"
            >
              Edit profile
            </button>
          </div>
        </div>

        <div className="mt-3">
          <p className="flex items-center gap-1 text-xl font-extrabold">
            Jubril
            <Verified className="h-5 w-5 fill-sky-500 text-white" />
          </p>
          <p className="text-[15px] text-zinc-500">{handle}</p>

          <p className="mt-3 text-[15px] leading-6 text-zinc-900">
            Full-stack developer building polished web products with Next.js. I
            care about strong UX details and clean implementation.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-zinc-500">
            <p className="inline-flex items-center gap-1.5">
              <Link2 className="h-4 w-4" />
              <span className="text-sky-600">jubril.dev</span>
            </p>
            <p className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Joined March 2026
            </p>
          </div>

          <div className="mt-3 flex items-center gap-5 text-[15px]">
            <p>
              <span className="font-bold text-zinc-900">214</span>{" "}
              <span className="text-zinc-500">Following</span>
            </p>
            <p>
              <span className="font-bold text-zinc-900">1,482</span>{" "}
              <span className="text-zinc-500">Followers</span>
            </p>
          </div>
        </div>
      </div>

      {/* <nav className="grid grid-cols-6 border-b border-zinc-200 text-[15px]">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`relative py-4 font-medium transition hover:bg-zinc-100 ${
              index === 0 ? "font-semibold text-black" : "text-zinc-500"
            }`}
          >
            <span className="truncate">{tab}</span>
            {index === 0 ? (
              <span className="absolute right-4 bottom-0 left-4 h-1 rounded-full bg-sky-500" />
            ) : null}
          </button>
        ))}
      </nav> */}

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            className="cursor-pointer border-b border-zinc-200 px-4 py-3 transition hover:bg-zinc-50"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-300 font-semibold">
                J
              </div>
              {/* <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[15px]">
                  <span className="truncate font-bold">Jubril</span>
                  <Verified className="h-4 w-4 fill-sky-500 text-white" />
                  <span className="truncate text-zinc-500">{handle}</span>
                  <span className="text-zinc-500">· {post.time}</span>
                  <Ellipsis className="ml-auto h-5 w-5 text-zinc-500" />
                </div>
                <p className="mt-1 text-[15px] leading-6 text-zinc-900">
                  {post.text}
                </p>
                <div className="mt-3 grid grid-cols-4 text-sm text-zinc-500">
                  <span>{post.stats.replies}</span>
                  <span>{post.stats.reposts}</span>
                  <span>{post.stats.likes}</span>
                  <span>{post.stats.views}</span>
                </div>
              </div> */}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProfilePageSection;
