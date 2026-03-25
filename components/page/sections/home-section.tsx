"use client";
import React from "react";
import { Ellipsis, Image as ImageIcon, Verified } from "lucide-react";
import CreatePostForm from "@/components/homepage/post/create-post-form";

interface HomeSectionProps {
  posts: {
    id: number;
    name: string;
    handle: string;
    time: string;
    text: string;
    stats: {
      replies: string;
      reposts: string;
      likes: string;
      views: string;
    };
    verified: boolean;
    image?: string;
  }[];
  userImage?: string;
}
const tabs = ["For you", "Following"];

const HomeSection: React.FC<HomeSectionProps> = ({ posts, userImage }) => {
  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="grid grid-cols-2 text-sm">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`relative py-4 font-semibold transition hover:bg-zinc-100 ${
                index === 0 ? "text-black" : "text-zinc-500"
              }`}
            >
              {tab}
              {index === 0 && (
                <span className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-sky-500" />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="border-b border-zinc-200 px-4 pt-4">
        <CreatePostForm userImage={userImage} />
      </div>

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            className="cursor-pointer border-b border-zinc-200 px-4 py-3 transition hover:bg-zinc-50"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-300 font-semibold">
                {post.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[15px]">
                  <span className="truncate font-bold">{post.name}</span>
                  {post.verified && (
                    <Verified className="h-4 w-4 fill-sky-500 text-white" />
                  )}
                  <span className="truncate text-zinc-500">{post.handle}</span>
                  <span className="text-zinc-500">· {post.time}</span>
                  <Ellipsis className="ml-auto h-5 w-5 text-zinc-500" />
                </div>
                <p className="mt-1 text-[15px] leading-6">{post.text}</p>
                <div className="mt-3 grid grid-cols-4 text-sm text-zinc-500">
                  <span>{post.stats.replies}</span>
                  <span>{post.stats.reposts}</span>
                  <span>{post.stats.likes}</span>
                  <span>{post.stats.views}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeSection;
