import React, { Suspense } from "react";
import { Ellipsis, Image as ImageIcon, Verified } from "lucide-react";
import CreatePostForm from "@/components/homepage/post/create-post-form";
import AllPosts from "@/components/homepage/post/all-posts";
import { CgSpinner } from "react-icons/cg";

interface HomeSectionProps {
  userImage: string;
  currentUserId: string | null;
}
const tabs = ["For you", "Following"];

const HomeSection: React.FC<HomeSectionProps> = ({
  userImage,
  currentUserId,
}) => {
  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      <Suspense
        fallback={
          <CgSpinner
            className="mx-auto mt-5 animate-spin text-2xl text-sky-500"
            size={24}
          />
        }
      >
        <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
          <div className="grid grid-cols-2 text-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`relative py-4 font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  index === 0 ? "text-black dark:text-white" : "text-zinc-500"
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

        <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 pt-4">
          <CreatePostForm userImage={userImage} />
        </div>

        <AllPosts currentUserId={currentUserId} />
      </Suspense>
    </section>
  );
};

export default HomeSection;
