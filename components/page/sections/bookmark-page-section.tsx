import React from "react";
import { BookmarkCheck, Ellipsis, Verified } from "lucide-react";

const bookmarkedPosts = [
  {
    id: 1,
    name: "OpenAI",
    handle: "@OpenAI",
    time: "3h",
    verified: true,
    text: "Reasoning and coding quality keep improving. Build, test, and ship with confidence.",
    stats: { replies: "91", reposts: "214", likes: "1.9K", views: "72K" },
  },
  {
    id: 2,
    name: "Vercel",
    handle: "@vercel",
    time: "8h",
    verified: true,
    text: "Performance wins are cumulative: optimize images, cache intelligently, and stream what matters first.",
    stats: { replies: "44", reposts: "108", likes: "987", views: "41K" },
  },
  {
    id: 3,
    name: "Frontend Daily",
    handle: "@FrontendDaily",
    time: "1d",
    verified: false,
    text: "Design systems are most useful when they are flexible enough for product creativity and strict enough for consistency.",
    stats: { replies: "27", reposts: "63", likes: "602", views: "24K" },
  },
];

const BookmarkPageSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 px-4 py-2 backdrop-blur-md">
        <h1 className="text-xl leading-tight font-extrabold">Bookmarks</h1>
        <p className="text-[13px] text-zinc-500">@jubril1234</p>
      </header>

      <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-sm text-zinc-500">
        <p>Only you can see your bookmarks.</p>
      </div>

      <div>
        {bookmarkedPosts.map((post) => (
          <article
            key={post.id}
            className="cursor-pointer border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <div className="mb-2 flex items-center gap-2 text-[13px] font-medium text-zinc-500">
              <BookmarkCheck className="h-4 w-4" />
              <span>You bookmarked</span>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-600 font-semibold">
                {post.name[0]}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[15px]">
                  <span className="truncate font-bold">{post.name}</span>
                  {post.verified ? (
                    <Verified className="h-4 w-4 fill-sky-500 text-white" />
                  ) : null}
                  <span className="truncate text-zinc-500">{post.handle}</span>
                  <span className="text-zinc-500">· {post.time}</span>
                  <Ellipsis className="ml-auto h-5 w-5 text-zinc-500" />
                </div>

                <p className="mt-1 text-[15px] leading-6 text-zinc-900 dark:text-zinc-100">{post.text}</p>

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

export default BookmarkPageSection;
