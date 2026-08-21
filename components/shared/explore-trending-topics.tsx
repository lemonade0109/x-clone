import { getTrendingTopicsAction } from "@/lib/actions/explore/trending-topics-action";
import Link from "next/link";

const ExploreTrendingTopics = async () => {
  const topics = await getTrendingTopicsAction();

  return (
    <section className="rounded-2xl border border-zinc-200 py-3 dark:border-zinc-800">
      <h2 className="px-4 pb-2 text-xl font-extrabold">
        What&apos;s happening
      </h2>

      {topics.length === 0 ? (
        <p className="px-4 py-3 text-sm text-zinc-500">
          No trending topics yet.
        </p>
      ) : (
        topics.map((topic) => (
          <Link
            key={topic.tag}
            href={`/explore?q=%23${encodeURIComponent(topic.tag)}`}
            className="block w-full px-4 py-3 text-left transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800/30"
          >
            <p className="text-xs text-zinc-500">
              {topic.category} · {topic.postCount} posts
            </p>
            <p className="mt-0.5 text-[15px] font-bold text-zinc-900 dark:text-zinc-100">
              #{topic.tag}
            </p>
          </Link>
        ))
      )}
    </section>
  );
};

export default ExploreTrendingTopics;
