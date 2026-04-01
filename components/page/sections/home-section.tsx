import React from "react";
import { Ellipsis, Image as ImageIcon, Verified } from "lucide-react";
import CreatePostForm from "@/components/homepage/post/create-post-form";
import AllPosts from "@/components/homepage/post/all-posts";

interface HomeSectionProps {
  userImage: string;
}
const tabs = ["For you", "Following"];

const HomeSection: React.FC<HomeSectionProps> = ({ userImage }) => {
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

      <AllPosts />
    </section>
  );
};

export default HomeSection;
