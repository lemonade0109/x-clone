import React from "react";
import { getCurrentUserAction } from "@/lib/actions/user/get-current-user-action";
import { getBookmarkedPostsAction } from "@/lib/actions/bookmark/bookmark.action";
import AllPostsContainer from "@/components/homepage/post/all-posts-container";
import ClearBookmarksButton from "./clear-bookmarks-button";

const BookmarkPageSection: React.FC = async () => {
  const currentUser = await getCurrentUserAction();
  const posts = currentUser ? await getBookmarkedPostsAction() : [];

  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 px-4 py-2 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Bookmarks
          </h1>
          <p className="text-xs text-zinc-500">
            @{currentUser?.username ?? "user"}
          </p>
        </div>
        {posts.length > 0 && <ClearBookmarksButton />}
      </header>

      {/* Feed or Empty State */}
      {posts.length === 0 ? (
        <div className="mx-auto flex max-w-sm flex-col items-start justify-center px-8 py-16 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Save posts for later
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
            Don&apos;t let the good ones fly away! Bookmark posts to easily find
            them again in the future.
          </p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <AllPostsContainer
              key={post.id}
              post={post}
              currentUser={{
                id: currentUser?.id ?? "",
                image: currentUser?.image ?? null,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarkPageSection;
